/**
 * Google Sheets Data Utility (v7 - Real-time Sync & Official API Ready)
 * Created by Kodari Manager
 * 
 * Priority: process.env.NEXT_PUBLIC_SHEET_ID -> Hardcoded Backup
 */

const FALLBACK_SHEET_ID = '1di-x-cxPQIIAjnaG-EM-KQBJMJjqYkcLilWo-i1vTeI';
const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID || FALLBACK_SHEET_ID;
const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

/**
 * Transforms various URL types into direct media IDs or download links
 */
export function getDirectLink(url) {
  if (!url) return '';
  const u = url.trim();
  
  if (u.includes('youtube.com') || u.includes('youtu.be')) {
    let videoId = '';
    try {
      const search = u.split('?')[1];
      if (search) {
        const params = new URLSearchParams(search);
        videoId = params.get('v');
      }
      if (!videoId && u.includes('youtu.be/')) videoId = u.split('youtu.be/')[1].split('?')[0];
      if (!videoId && u.includes('shorts/')) videoId = u.split('shorts/')[1].split('?')[0];
      if (!videoId && u.includes('embed/')) videoId = u.split('embed/')[1].split('?')[0];
    } catch (e) {
      const match = u.match(/(?:v=|youtu\.be\/|shorts\/|embed\/)([^?&/]+)/);
      videoId = match ? match[1] : '';
    }
    return videoId || '';
  }
  
  // Google Drive Direct View Handling (Auto-convert for images/docs)
  if (u.includes('drive.google.com')) {
    const match = u.match(/\/d\/([^/]+)/);
    if (match) {
      const id = match[1];
      // Use thumbnail for faster loading and better cross-origin reliability in <img> tags
      return `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;
    }
  }
  
  // Handle open?id= format
  if (u.includes('drive.google.com') && u.includes('?id=')) {
    const id = u.split('?id=')[1].split('&')[0];
    return `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;
  }
  
  return u;
}

/**
 * Detects content type based on URL
 */
function getContentType(url) {
  if (!url) return 'text';
  const u = url.toLowerCase();
  if (u.includes('youtube.com') || u.includes('youtu.be')) return 'video';
  if (u.match(/\.(jpg|jpeg|png|webp|gif|svg)$/)) return 'image';
  if (u.includes('drive.google.com') || u.match(/\.(pdf|zip|docx|xlsx)$/)) return 'download';
  return 'link';
}

/**
 * Robust CSV Parsing
 */
function parseCSV(text) {
  const rows = [];
  const lines = text.split(/\r?\n/);
  for (let line of lines) {
    if (!line.trim() || line.includes('===========') || line.startsWith(',')) continue;
    
    const parts = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') inQuotes = !inQuotes;
      else if (char === ',' && !inQuotes) {
        parts.push(current.trim());
        current = '';
      } else current += char;
    }
    parts.push(current.trim());
    rows.push(parts);
  }
  return rows;
}

/**
 * Fetches and processes Google Sheet data with anti-caching
 */
export async function getSheetData() {
  try {
    const fetchUrl = `${SHEET_CSV_URL}&t=${Date.now()}`;
    const response = await fetch(fetchUrl, { 
      cache: 'no-store',
      headers: { 'Pragma': 'no-cache', 'Cache-Control': 'no-cache' },
      next: { revalidate: 0 }
    });
    
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const csvData = await response.text();
    const rows = parseCSV(csvData);

    const result = rows.slice(1).map(row => {
      const pageNum = parseInt(row[0]);
      if (isNaN(pageNum)) return null;

      const typeHint = (row[2] || '').toLowerCase();
      const subject = row[3] || '';
      let linkOrValue = row[4] || '';
      let desc = (row[5] || '').replace(/\\n/g, '\n');

      // Detect if linkOrValue is a URL or a Value
      const isUrl = linkOrValue.trim().startsWith('http');
      
      let link = isUrl ? linkOrValue.trim() : '';
      let val = !isUrl ? linkOrValue.trim() : '';

      // Fallback for Page 2 (if desc was used for URL in previous version, check here too)
      if (!link && desc.trim().startsWith('http')) {
        link = desc.trim();
        desc = '';
      }

      // Skip if everything is empty
      if (!link && !val && !desc && !subject) return null;

      return {
        page: pageNum.toString(),
        section: row[1] || '',
        subject: subject,
        link: link,
        displayLink: getDirectLink(link),
        type: typeHint === 'video' || getContentType(link) === 'video' ? 'video' : getContentType(link),
        description: desc,
        value: val,
        unit: '', // Unit seems to be combined in Value now
        formattedValue: val
      };
    }).filter(Boolean);

    // Deep grouping: Page -> Section -> [Items]
    const grouped = {};
    result.forEach(item => {
      if (!grouped[item.page]) grouped[item.page] = {};
      if (!grouped[item.page][item.section]) grouped[item.page][item.section] = [];
      grouped[item.page][item.section].push(item);
    });

    return { all: result, grouped };
  } catch (error) {
    console.error('Sheet fetch error:', error);
    return { all: [], grouped: {} };
  }
}
