import { getSheetData } from '../src/lib/sheets.js';
import fs from 'fs';

async function test() {
    process.env.NEXT_PUBLIC_SHEET_ID = '1di-x-cxPQIIAjnaG-EM-KQBJMJjqYkcLilWo-i1vTeI';
    const data = await getSheetData();
    const page7 = data.grouped['7'] || {};
    fs.writeFileSync('page7_debug.json', JSON.stringify(page7, null, 2));
    console.log('Page 7 Sections:', Object.keys(page7));
}

test();
