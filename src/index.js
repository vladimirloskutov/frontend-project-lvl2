import fs from 'fs';
import path from 'path';
import buildAst from './buildAst.js';
import parse from './parsers.js';
import getFormattedTree from './formatters/index.js';

const getData = (filepath) => ({
  data: fs.readFileSync(filepath, 'utf8'),
  type: path.extname(filepath).substring(1),
});

export default (filepath1, filepath2, format = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const parsedData1 = parse(data1.data, data1.type);
  const parsedData2 = parse(data2.data, data2.type);
  const ast = buildAst(parsedData1, parsedData2);
  return getFormattedTree(ast, format);
};
