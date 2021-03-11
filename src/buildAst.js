import _ from 'lodash';

const buildAst = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const generalKeys = _.union(keys1, keys2).sort();

  const ast = generalKeys.flatMap((key) => {
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      if (!_.has(file2, key)) {
        return {
          key,
          value: file1[key],
          state: 'deleted',
          children: buildAst(file1[key], file2[key]),
        };
      }
      if (!_.has(file1, key)) {
        return {
          key,
          value: file2[key],
          state: 'added',
          children: buildAst(file1[key], file2[key]),
        };
      }
      if (file1[key] === file2[key]) {
        return {
          key,
          value: file1[key],
          state: 'unchanged',
          children: buildAst(file1[key], file2[key]),
        };
      }
      if (file1[key] !== file2[key]) {
        return {
          key,
          oldValue: file1[key],
          newValue: file2[key],
          state: 'changed',
          children: buildAst(file1[key], file2[key]),
        };
      }
    }

    if (!_.has(file2, key)) {
      return {
        key,
        value: file1[key],
        state: 'deleted',
      };
    }
    if (!_.has(file1, key)) {
      return {
        key,
        value: file2[key],
        state: 'added',
      };
    }
    if (file1[key] === file2[key]) {
      return {
        key,
        value: file1[key],
        state: 'unchanged',
      };
    }
    if (file1[key] !== file2[key]) {
      return {
        key,
        oldValue: file1[key],
        newValue: file2[key],
        state: 'changed',
      };
    }
  });

  return ast;
};

export default buildAst;
