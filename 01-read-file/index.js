const fs = require('fs');
const path = require('path');
const textPath = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(textPath, 'utf-8');

stream.on('data', (text) => {
  console.log(text);
});
