import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

const SHEET_PERFORMANCE_ID = '16VKEYNvPaqyfhOi5h6fwh-sqMESxCYAD4HSyBT0TRZM';
const SHEET_CONTENT_ID = '1di-x-cxPQIIAjnaG-EM-KQBJMJjqYkcLilWo-i1vTeI';

/**
 * Robust Google Sheets Data Fetcher
 * Strategy: Official API (Service Account) -> CSV Fallback
 */
export async function getPerformanceData() {
  // 1. Try Official API if credentials exist
  const credentialsPath = path.join(process.cwd(), 'credentials.json');
  if (fs.existsSync(credentialsPath)) {
    try {
      const auth = new google.auth.GoogleAuth({
        keyFile: credentialsPath,
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
      });
      const sheets = google.sheets({ version: 'v4', auth });
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_PERFORMANCE_ID,
        range: 'A6:Q20', // Based on analysis
      });
      
      return parsePerformanceRows(response.data.values);
    } catch (error) {
      console.warn('Google API failed, falling back to CSV:', error.message);
    }
  }

  // 2. CSV Fallback
  try {
    const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_PERFORMANCE_ID}/export?format=csv&t=${Date.now()}`;
    const response = await fetch(csvUrl, { cache: 'no-store' });
    const text = await response.text();
    const rows = parseCSV(text).slice(5); // Skip headers
    return parsePerformanceRows(rows);
  } catch (error) {
    console.error('Data fetch failed:', error);
    return [];
  }
}

function parsePerformanceRows(rows) {
  if (!rows) return [];
  return rows.map((row, idx) => {
    if (!row[0]) return null;
    
    const metrics = [
      parseValue(row[3]), // 3M
      parseValue(row[4]), // 6M
      parseValue(row[5]), // 1Y
      parseValue(row[6]), // 2Y
      parseValue(row[7]), // 3Y
      parseValue(row[8]), // 4Y
      parseValue(row[9])  // 5Y
    ];

    const videos = [
      { period: '3M', url: row[10], score: metrics[0] },
      { period: '6M', url: row[11], score: metrics[1] },
      { period: '1Y', url: row[12], score: metrics[2] },
      { period: '2Y', url: row[13], score: metrics[3] },
      { period: '3Y', url: row[14], score: metrics[4] },
      { period: '4Y', url: row[15], score: metrics[5] },
      { period: '5Y', url: row[16], score: metrics[6] }
    ].filter(v => v.url && v.url.includes('http'));

    return {
      id: idx,
      name: row[0],
      location: row[1],
      date: row[2],
      metrics,
      videos,
      isWaterpass: row[0].toLowerCase().includes('ash') || row[0].toLowerCase().includes('waterpass')
    };
  }).filter(Boolean);
}

function parseValue(val) {
  if (!val || val === '-') return null;
  const num = parseFloat(val);
  return isNaN(num) ? null : num;
}

function parseCSV(text) {
  const lines = text.split('\n');
  return lines.map(line => {
    const parts = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') inQuotes = !inQuotes;
      else if (char === ',' && !inQuotes) { parts.push(current.trim()); current = ''; }
      else current += char;
    }
    parts.push(current.trim());
    return parts;
  });
}
