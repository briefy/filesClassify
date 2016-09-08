const mvFileType = require('./mvFileType');

// the sequence of the fileTypes matters
const fileTypes = [
  'sass', 'css|float',
  'node|mean|meap', 'express', 'angular', 'mongo',
  'jade', 'html',
  'git',
  'ajax|httprequest', 'http',
  'design',
  'es|es6|es7|es2015', 'dom', 'typescript', 'javascript|app|js(?!$)',
];
// destination path to save sorted files
const destPath = '../test';
// specify the directory to sort files in
try {
  process.chdir('../books');
  console.log(`New directory: ${process.cwd()}`);
} catch (err) {
  throw err;
}

console.time('mvfiles  ');
fileTypes.forEach((ft) => {
  mvFileType(ft, destPath);
});

process.on('exit', () => {
  console.timeEnd('mvfiles  ');
});