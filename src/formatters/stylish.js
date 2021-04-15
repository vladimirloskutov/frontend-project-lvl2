import _ from 'lodash';

const baseIndent = '    ';
const operationTypes = {
  added: '+',
  deleted: '-',
  unchanged: ' ',
};

const stringify = (value, spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    if (currentValue === null) {
      return null;
    }

    if (!_.isObject(currentValue)) {
      return currentValue.toString();
    }

    const indentSize = depth * spacesCount + 1;
    const currentIndent = baseIndent.repeat(indentSize);
    const bracketIndent = baseIndent.repeat(indentSize - 1);
    const lines = Object.entries(currentValue).map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, 1);
};

const filterValue = (itemValue, depth) => {
  if (typeof itemValue === 'object') {
    return stringify(itemValue, depth + 1);
  }

  return itemValue;
};

const formatString = (indent, itemKey, itemValue, depth, operationType = ' ') => `${indent}  ${operationType} ${itemKey}: ${filterValue(itemValue, depth)}`;

const toStylish = (ast) => {
  const iter = (node, depth) => {
    const indent = baseIndent.repeat(depth);

    const lines = node.map((item) => {
      switch (item.type) {
        case 'nested':
          return [`${indent}    ${item.key}: ${iter(item.children, depth + 1)}`];
        case 'changed':
          return [`${formatString(indent, item.key, item.oldValue, depth, operationTypes.deleted)}\n${formatString(indent, item.key, item.newValue, depth, operationTypes.added)}`];
        case 'added':
        case 'deleted':
        case 'unchanged':
          return [formatString(indent, item.key, item.value, depth, operationTypes[item.type])];
        default:
          throw new Error(`Unknown node type: '${item.type}'!`);
      }
    });

    return ['{', ...lines, `${indent}}`].join('\n');
  };

  return iter(ast, 0);
};

export default toStylish;
