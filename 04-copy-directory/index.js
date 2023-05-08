const fs = require('fs');
const path = require('path');
const initialFolder = path.join(__dirname, 'files');
const copyFolder = path.join(__dirname, 'files-copy');

fs.rm(copyFolder, { recursive: true, force: true }, (err) => {
  if (err) {
    console.log(err);
  }

  fs.mkdir(copyFolder, { recursive: true }, (err) => {
    if (err) throw err;
  });
  fs.readdir(initialFolder, (err, filesArray) => {
    filesArray.forEach((file) => {
      const oldFilePath = path.join(initialFolder, file);
      const newFilePath = path.join(copyFolder, file);
      fs.copyFile(oldFilePath, newFilePath, (err) => {
        if (err) throw err;
      });
    });
  });
});
