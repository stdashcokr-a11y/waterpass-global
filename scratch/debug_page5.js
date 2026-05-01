import { getSheetData } from '../src/lib/sheets.js';
import fs from 'fs';

async function test() {
    process.env.NEXT_PUBLIC_SHEET_ID = '1di-x-cxPQIIAjnaG-EM-KQBJMJjqYkcLilWo-i1vTeI';
    const data = await getSheetData();
    const page5 = data.grouped['5'] || {};
    fs.writeFileSync('page5_debug.json', JSON.stringify(page5, null, 2));
    console.log('Page 5 Sections:', Object.keys(page5));
}

test();
