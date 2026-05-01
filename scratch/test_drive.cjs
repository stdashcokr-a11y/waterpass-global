const https = require('https');

const testUrl = 'https://drive.google.com/uc?export=download&id=1vHDsyVKnw3wkBvLf7talWpmxiieTtrmX';

console.log("Testing Google Drive Direct Link:", testUrl);

https.get(testUrl, (res) => {
  console.log("Status Code:", res.statusCode);
  console.log("Headers:", res.headers['content-type'], res.headers['location']);
  
  if (res.statusCode === 302) {
    console.log("Redirecting to:", res.headers.location);
    https.get(res.headers.location, (res2) => {
        console.log("Final Status Code:", res2.statusCode);
        console.log("Final Content-Type:", res2.headers['content-type']);
    });
  }
}).on('error', (e) => {
  console.error("Error:", e);
});
