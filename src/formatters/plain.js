import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  if (_.isString(value)) {
    return `'${value}'`;
  }

  return value;
};

const getPlain = (ast) => {
  const iter = (node, currentPath) => {
    const lines = node.map((item) => {
      const fullPath = currentPath === '' ? item.key : `${currentPath}.${item.key}`;

      if (item.type === 'nested') {
        return iter(item.children, fullPath);
      }

      if (item.type === 'deleted') {
        return `Property '${fullPath}' was removed`;
      }

      if (item.type === 'added') {
        return `Property '${fullPath}' was added with value: ${stringify(item.value)}`;
      }

      if (item.type === 'changed') {
        return `Property '${fullPath}' was updated. From ${stringify(item.oldValue)} to ${stringify(item.newValue)}`;
      }

      return null;
    });

    return lines.filter((item) => item).join('\n');
  };

  return iter(ast, '');
};

export default getPlain;
