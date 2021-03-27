import _ from 'lodash';

const buildAst = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.union(keys1, keys2);

  const ast = _.sortBy(keys).map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        key,
        type: 'nested',
        children: buildAst(data1[key], data2[key]),
      };
    }

    if (!_.has(data2, key)) {
      return {
        key,
        value: data1[key],
        type: 'deleted',
      };
    }

    if (!_.has(data1, key)) {
      return {
        key,
        value: data2[key],
        type: 'added',
      };
    }

    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key,
        oldValue: data1[key],
        newValue: data2[key],
        type: 'changed',
      };
    }

    return {
      key,
      value: data1[key],
      type: 'unchanged',
    };
  });

  return ast;
};

export default buildAst;
