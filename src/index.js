import buildAst from './buildAst.js';
import parse from './parsers.js';
import getFormattedTree from './formatters/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = parse(filepath1);
  const file2 = parse(filepath2);
  const ast = buildAst(file1, file2);
  return getFormattedTree(ast, format);
};

export default genDiff;
