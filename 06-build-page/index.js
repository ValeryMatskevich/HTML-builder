const fs = require('fs');
const path = require('path');
const assets = path.join(__dirname, 'assets');
const projectDist = path.join(__dirname, 'project-dist');
const projectDistAssets = path.join(__dirname, 'project-dist', 'assets');
const styleslFolder = path.join(__dirname, 'styles');
const template = path.join(__dirname, 'template.html');
const index = path.join(projectDist, 'index.html');
const componentsFolder = path.join(__dirname, 'components');

fs.rm(projectDist, { recursive: true, force: true }, (err) => {
  if (err) {
    console.log(err);
  }
  const style = fs.createWriteStream(path.join(projectDist, 'style.css'));
  copyStyles(styleslFolder, style);
  const indexHtml = fs.createWriteStream(path.join(projectDist, 'index.html'));
  const stream = fs.createReadStream(template, 'utf-8');
  let refactorHtml = '';
  stream.on('data', (text) => {
    refactorHtml += text;
  });
  stream.on('end', () => {
    fs.readdir(componentsFolder, { withFileTypes: true }, (err, filesArray) => {
      if (!err) {
        filesArray.forEach((file) => {
          if (file.isFile() && path.extname(file.name) === '.html') {
            fs.readFile(
              path.join(componentsFolder, file.name),
              'utf8',
              (err, data) => {
                const tagName = path.basename(
                  file.name,
                  path.extname(file.name)
                );
                refactorHtml = refactorHtml.replace(
                  new RegExp(`{{${tagName}}}`, 'g'),
                  data
                );
                if (file === filesArray[filesArray.length - 1]) {
                  indexHtml.write(refactorHtml);
                }
              }
            );
          }
        });
      }
    });
  });

  fs.mkdir(projectDist, { recursive: true }, (err) => {
    if (err) throw err;

    fs.mkdir(projectDistAssets, { recursive: true }, (err) => {
      if (err) throw err;

      fs.readdir(assets, { withFileTypes: true }, (err, filesArray) => {
        filesArray.forEach((file) => {
          const oldPath = path.join(assets, file.name);
          const newPath = path.join(projectDistAssets, file.name);
          if (file.isDirectory()) copyDir(oldPath, newPath);
          else {
            fs.copyFile(oldPath, newPath, (err) => {
              if (err) throw err;
            });
          }
        });
      });
    });
  });
});

function copyStyles(styleslFolder, style) {
  fs.readdir(styleslFolder, { withFileTypes: true }, (err, filesArray) => {
    filesArray.forEach((file) => {
      if (file.isFile() && path.extname(file.name) === '.css') {
        const stylePath = path.join(styleslFolder, file.name);
        const stream = fs.createReadStream(stylePath, 'utf-8');
        stream.on('data', (text) => {
          style.write(text);
        });
      }
    });
  });
}

function copyDir(oldF, newF) {
  fs.mkdir(newF, { recursive: true }, (err) => {
    if (err) throw err;
    fs.readdir(oldF, { withFileTypes: true }, (err, filesArray) => {
      filesArray.forEach((file) => {
        const oldPath = path.join(oldF, file.name);
        const newPath = path.join(newF, file.name);
        fs.copyFile(oldPath, newPath, (err) => {
          if (err) throw err;
        });
      });
    });
  });
}
