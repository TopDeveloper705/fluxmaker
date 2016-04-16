import path from 'path';

export default function fileName(rawName) {
  return path.basename(rawName, path.extname(rawName));
}
