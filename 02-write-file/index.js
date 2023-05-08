const { stdout, stdin, exit } = process;
const fs = require('fs');
const path = require('path');
const file = fs.createWriteStream(path.join(__dirname, 'text.txt'));
stdout.write(
  'Введите текст который хотите добавить в файл\nДля выхода нажмите сочетание клавиш ctrl+c или введите exit\n'
);
stdin.on('data', (text) => {
  text.toString().trim() === 'exit' ? exit() : file.write(text);
});

process.on('SIGINT', () => process.exit());
process.on('exit', () => console.log('Текст добавлен в файл. Хорошего дня'));
