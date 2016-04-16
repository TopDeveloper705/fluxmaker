import fs from 'fs';
import path from 'path';

const requirableFiles = (fileName) => {
  const fileFormat = path.extname(fileName);
  const validFormats = ['.js', '.jsx', '.json'];

  const isValidFormat = validFormats.indexOf(fileFormat) !== -1;
  const isIndex = fileName.indexOf('index.js') === 0;
  const isHidden = fileName[0] === '.';

  return isValidFormat && !isIndex && !isHidden;
};

export default function eachFromFolder(folderPath, iterator, filter = requirableFiles) {
  fs.readdirSync(folderPath)
    .filter(filter)
    .forEach(iterator);
};
