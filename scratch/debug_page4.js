import { getSheetData } from './src/lib/sheets.js';
import fs from 'fs';

async function test() {
    process.env.NEXT_PUBLIC_SHEET_ID = '1di-x-cxPQIIAjnaG-EM-KQBJMJjqYkcLilWo-i1vTeI';
    const data = await getSheetData();
    fs.writeFileSync('all_data_debug.json', JSON.stringify(data, null, 2));
    console.log('Page 4 Data:', data.grouped['4']);
}

test();
