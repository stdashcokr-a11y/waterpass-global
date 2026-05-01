import { getSheetData } from './src/lib/sheets.js';

async function checkAllData() {
  const data = await getSheetData();
  console.log('--- All Data (Flat) ---');
  console.log(data.all.map(i => ({ page: i.page, section: i.section, subject: i.subject })));
}

checkAllData();
