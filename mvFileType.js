module.exports = (fileType, destPath) => {
  const assert = require('assert');
  const fs = require('fs');
  const path = require('path');

  assert.ok(typeof fileType === 'string');
  assert.ok(typeof destPath === 'string');

  const rFileType = new RegExp(fileType, 'i');
  const noop = () => {};

  fs.readdir('.', {
    encoding: 'utf8',
  }, (err, files) => {
    files
      .filter((file) => {
        const isFile = fs.statSync(file).isFile();
        return isFile && rFileType.test(file);
      })
      .map((file) => {
        const pfile = `./${file}`;
        return fs.realpathSync(pfile);
      })
      .forEach((file) => {
        const readStream = fs.createReadStream(file);
        const dp = `${destPath}/${fileType.split('|')[0]}`;

        try {
          fs.mkdirSync(`${destPath}/${fileType.split('|')[0]}`);
        } catch (e) {
          noop();
        }

        assert.ok(dp, 'destPath should exist');

        // how to stop throw an error if file opened or locked
        // try {
        const writeStream = fs.createWriteStream(`${dp}/${path.basename(file)}`);
        readStream.pipe(writeStream);
        readStream.on('end', () => {
          // fs.unlink(file, () => {});
        });
        // } catch (e) {
        //   console.log(e.message);
        // }
      });
  });
};