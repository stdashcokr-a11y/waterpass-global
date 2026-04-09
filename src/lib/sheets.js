/**
 * Google Sheets Data Utility
 * Created by Kodari Manager (Connect AI LAB Jay)
 */

const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1di-x-cxPQIIAjnaG-EM-KQBJMJjqYkcLilWo-i1vTeI/export?format=csv';

/**
 * Converts Google Drive view link to direct download link
 */
export function getDirectLink(url) {
  if (!url) return '';
  
  // Google Drive conversion
  if (url.includes('drive.google.com')) {
    const match = url.match(/\/d\/([^/]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=download&id=${match[1]}`;
    }
  }
  
  // YouTube conversion (for embed players)
  if (url.includes('youtube.com/watch') || url.includes('youtu.be') || url.includes('youtube.com/shorts')) {
    let videoId = '';
    if (url.includes('v=')) {
      videoId = new URL(url).searchParams.get('v');
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('shorts/')) {
      videoId = url.split('shorts/')[1].split('?')[0];
    }
    return videoId; // Return ID for YouTube player components
  }
  
  return url;
}

/**
 * Fetches and parses the Google Sheet data
 */
export async function getSheetData() {
  try {
    const response = await fetch(SHEET_CSV_URL, {
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });
    
    if (!response.ok) throw new Error('Failed to fetch sheet');
    
    const csvData = await response.text();
    const rows = csvData.split('\n').map(row => {
      // Simple CSV parser for quoted strings
      const parts = [];
      let current = '';
      let inQuotes = false;
      
      for (let i = 0; i < row.length; i++) {
        const char = row[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          parts.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      parts.push(current.trim());
      return parts;
    });

    // Header index mapping
    // page, section, video or photos, subject, link address, Description
    const headers = rows[0].map(h => h.toLowerCase().trim());
    const dataRows = rows.slice(1);

    const result = dataRows
      .filter(row => row[4] && row[4].trim() !== '') // Filter empty link addresses
      .map(row => ({
        page: row[0],
        section: row[1],
        type: row[2]?.toLowerCase().includes('video') ? 'video' : 'photo',
        subject: row[3],
        link: row[4],
        displayLink: getDirectLink(row[4]),
        description: row[5] || ''
      }));

    // Grouping by Page and Subject
    const grouped = {};
    result.forEach(item => {
      if (!grouped[item.page]) grouped[item.page] = {};
      if (!grouped[item.page][item.subject]) grouped[item.page][item.subject] = [];
      grouped[item.page][item.subject].push(item);
    });

    return {
      all: result,
      grouped: grouped
    };
  } catch (error) {
    console.error('Sheet fetch error:', error);
    return { all: [], grouped: {} };
  }
}
