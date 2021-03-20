import _ from 'lodash';

const buildAst = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.union(keys1, keys2).sort();

  const ast = keys.map((key) => {
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return {
        key,
        type: 'nested',
        children: buildAst(file1[key], file2[key]),
      };
    }

    if (!_.has(file2, key)) {
      return {
        key,
        value: file1[key],
        type: 'deleted',
      };
    }

    if (!_.has(file1, key)) {
      return {
        key,
        value: file2[key],
        type: 'added',
      };
    }

    if (file1[key] === file2[key]) {
      return {
        key,
        value: file1[key],
        type: 'unchanged',
      };
    }

    if (file1[key] !== file2[key]) {
      return {
        key,
        oldValue: file1[key],
        newValue: file2[key],
        type: 'changed',
      };
    }

    return null;
  });

  return ast;
};

export default buildAst;
