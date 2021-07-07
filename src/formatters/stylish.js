import _ from 'lodash';

const baseIndent = 4;
const calculateIndent = (depth, indent, sliceNumber = 0) => ' '.repeat(indent * depth + 2).slice(sliceNumber);
const operationTypes = {
  added: '+ ',
  deleted: '- ',
  unchanged: '  ',
};

const stringify = (value, spacesCount) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return currentValue;
    }

    const indentSize = depth + 2;
    const currentIndent = calculateIndent(indentSize, baseIndent, 2);
    const bracketIndent = calculateIndent(indentSize - 1, baseIndent, 2);
    const lines = Object.entries(currentValue).map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, spacesCount);
};

const toStylish = (ast) => {
  const iter = (node, depth) => {
    const indent = calculateIndent(depth, baseIndent);
    const bracketIndent = calculateIndent(depth, baseIndent, 2);
    const lines = node.map((item) => {
      switch (item.type) {
        case 'nested':
          return [`${indent}  ${item.key}: ${iter(item.children, depth + 1)}`];
        case 'changed':
          return [`${indent}${operationTypes.deleted}${item.key}: ${stringify(item.oldValue, depth)}\n${indent}${operationTypes.added}${item.key}: ${stringify(item.newValue, depth)}`];
        case 'added':
          return [`${indent}${operationTypes[item.type]}${item.key}: ${stringify(item.value, depth)}`];
        case 'deleted':
          return [`${indent}${operationTypes[item.type]}${item.key}: ${stringify(item.value, depth)}`];
        case 'unchanged':
          return [`${indent}${operationTypes[item.type]}${item.key}: ${stringify(item.value, depth)}`];
        default:
          throw new Error(`Unknown node type: '${item.type}'!`);
      }
    });

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(ast, 0);
};

export default toStylish;
