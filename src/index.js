import _ from 'lodash';
import parse from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const file1 = parse(filepath1);
  const file2 = parse(filepath2);

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
