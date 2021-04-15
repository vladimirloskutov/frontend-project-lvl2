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

const makeFullPath = (path, item) => (path === '' ? item : `${path}.${item}`);

const toPlain = (ast) => {
  const iter = (node, currentPath) => {
    const lines = node.map((item) => {
      const fullPath = makeFullPath(currentPath, item.key);

      switch (item.type) {
        case 'nested':
          return iter(item.children, fullPath);
        case 'deleted':
          return `Property '${fullPath}' was removed`;
        case 'added':
          return `Property '${fullPath}' was added with value: ${stringify(item.value)}`;
        case 'changed':
          return `Property '${fullPath}' was updated. From ${stringify(item.oldValue)} to ${stringify(item.newValue)}`;
        case 'unchanged':
          return null;
        default:
          throw new Error(`Unknown node type: '${item.type}'!`);
      }
    });

    return lines.filter((item) => item).join('\n');
  };

  return iter(ast, '');
};

export default toPlain;
