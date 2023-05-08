const fs = require('fs');
const path = require('path');
const styleslFolder = path.join(__dirname, 'styles');
const destinationFolder = path.join(__dirname, 'project-dist');
const bundle = fs.createWriteStream(path.join(destinationFolder, 'bundle.css'));

fs.readdir(styleslFolder, { withFileTypes: true }, (err, filesArray) => {
  filesArray.forEach((file) => {
    if (file.isFile() && path.extname(file.name) === '.css') {
      const stylePath = path.join(styleslFolder, file.name);
      console.log(stylePath);
      const stream = fs.createReadStream(stylePath, 'utf-8');
      stream.on('data', (text) => {
        bundle.write(text);
      });
    }
  });
});
