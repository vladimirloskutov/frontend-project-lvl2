import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const parse = (filepath) => {
  const extension = path.extname(filepath);
  if (extension === '.json') {
    return JSON.parse(fs.readFileSync(filepath, 'utf8'));
  }

  return yaml.load(fs.readFileSync(filepath, 'utf8'));
};

export default parse;
