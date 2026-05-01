import fetch from 'node-fetch';

async function peekCSV() {
  const url = 'https://docs.google.com/spreadsheets/d/1di-x-cxPQIIAjnaG-EM-KQBJMJjqYkcLilWo-i1vTeI/export?format=csv';
  const res = await fetch(url);
  const text = await res.text();
  console.log(text.substring(0, 1000));
}

peekCSV();
