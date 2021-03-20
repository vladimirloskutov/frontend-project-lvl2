import buildAst from './buildAst.js';
import parse from './parsers.js';
import getFormattedTree from './formatter.js';

const genDiff = (filepath1, filepath2) => {
  const file1 = parse(filepath1);
  const file2 = parse(filepath2);
  const ast = buildAst(file1, file2);
  return getFormattedTree(ast, 'stylish');
};

export default genDiff;
