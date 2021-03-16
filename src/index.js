import buildAst from './buildAst.js';
import parse from './parsers.js';

const stringify = (value, replacer = ' ', spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    if (typeof currentValue !== 'object') {
      return currentValue.toString();
    }

    if (currentValue === null) {
      return null;
    }

    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = Object
        .entries(currentValue)
        .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, 1);
};

const getStylish = (ast, depth = 1) => {
  const indent = '  '.repeat(depth);
  const lines = ast.flatMap((item) => {
    if (item.type !== 'nested') {
      if (item.type === 'added') {
        return [`${indent}+ ${item.key}: ${stringify(item.value, indent)}`];
      } else if (item.type === 'deleted') {
        return [`${indent}- ${item.key}: ${stringify(item.value, indent)}`];
      } else if (item.type === 'changed') {
        return [`${indent}- ${item.key}: ${stringify(item.oldValue, indent)}`, `${indent}+ ${item.key}: ${stringify(item.newValue, indent)}`];
      } else if (item.type === 'unchanged') {
        return [`${indent}${item.key}: ${stringify(item.value)}`];
      }
    } else {
      return [`${indent}${indent}${item.key}: ${getStylish(item.children, depth + 1)}${indent}`];
    }
  });

  return ['{', ...lines, `${indent}}`].join('\n');
};

const genDiff = (filepath1, filepath2) => {
  const file1 = parse(filepath1);
  const file2 = parse(filepath2);
  const ast = buildAst(file1, file2);
  return getStylish(ast);
  //return ast;
};

export default genDiff;
