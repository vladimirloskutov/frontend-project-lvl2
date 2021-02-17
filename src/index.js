import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import process from 'process';

const genDiff = (filepath1, filepath2) => {
  const file1 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filepath1), 'utf8'));
  const file2 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filepath2), 'utf8'));

  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const generalKeys = _.union(keys1, keys2).sort(); // вместо sort нужно использовать lodash

  const result = generalKeys.reduce((acc, key) => {
    if (!_.has(file2, key)) {
      acc[`- ${key}`] = file1[key];
    } else if (!_.has(file1, key)) {
      acc[`+ ${key}`] = file2[key];
    } else if (file1[key] === file2[key]) {
      acc[`  ${key}`] = file1[key];
    } else if (file1[key] !== file2[key]) {
      acc[`- ${key}`] = file1[key];
      acc[`+ ${key}`] = file2[key];
    }

    return acc;
  }, {});

  return JSON.stringify(result, null, '  ')
    .split(',')
    .join('')
    .split('"')
    .join('');
};

export default genDiff;
