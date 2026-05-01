const fs = require('fs');
const https = require('https');

const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1di-x-cxPQIIAjnaG-EM-KQBJMJjqYkcLilWo-i1vTeI/export?format=csv';

function getDirectLink(url) {
  if (!url) return '';
  if (url.includes('drive.google.com')) {
    const match = url.match(/\/d\/([^/]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=download&id=${match[1]}`;
    }
  }
  return url;
}

async function testFetch() {
  console.log("Fetching CSV from:", SHEET_CSV_URL);
  
  https.get(SHEET_CSV_URL, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      const rows = data.split('\n');
      console.log("Total rows found:", rows.length);
      
      const filtered = rows.slice(1).map(row => {
        const parts = row.split(',');
        return {
          page: parts[0],
          subject: parts[3],
          link: parts[4],
          converted: getDirectLink(parts[4])
        };
      }).filter(r => r.link && r.link.trim() !== '');
      
      console.log("Rows with links:", filtered.length);
      console.log("Sample converted links:");
      filtered.slice(0, 5).forEach(f => console.log(` - ${f.subject}: ${f.converted}`));
    });
  }).on('error', (err) => {
    console.error("Fetch error:", err);
  });
}

testFetch();
