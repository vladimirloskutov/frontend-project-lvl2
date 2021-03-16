import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const parse = (filepath) => {
  const extension = path.extname(filepath);
  switch (extension) {
    case '.json':
      return JSON.parse(fs.readFileSync(filepath, 'utf8'));
    case '.yml':
      return yaml.load(fs.readFileSync(filepath, 'utf8'));
    default:
      throw new Error(`Unknown file extension: '${extension}'!`);
  }
};

export default parse;
