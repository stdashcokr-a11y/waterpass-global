import { getSheetData } from './src/lib/sheets.js';

async function checkData() {
  const data = await getSheetData();
  console.log('--- Page 1 Data ---');
  console.log(JSON.stringify(data.grouped['1'], null, 2));
  console.log('--- Page 2 Data ---');
  console.log(JSON.stringify(data.grouped['2'], null, 2));
}

checkData();
