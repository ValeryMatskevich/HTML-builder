const { stdout, stdin, exit } = process;
const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true }, (err, filesArray) => {
  if (!err) {
    filesArray.forEach((file) => {
      if (file.isFile()) {
        const fileName = path.basename(file.name, path.extname(file.name));
        const fileExtension = path.extname(file.name).slice(1);
        fs.stat(path.join(folderPath, file.name), (err, stats) => {
          if (!err) {
            console.log(
              `${fileName} - ${fileExtension} - ${stats.size / 1024}kb`
            );
          }
        });
      }
    });
  }
});
