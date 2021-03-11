import buildAst from './buildAst.js';
import parse from './parsers.js';

// const stringify = (data, replacer = ' ', spacesCount = 1) => {
//   const iter = (item, depth) => {
//     if (typeof item !== 'object') {
//       return item.toString();
//     }
//
//     const paddingSize = spacesCount * depth;
//     const openingPadding = replacer.repeat(paddingSize);
//     const closingPadding = replacer.repeat(paddingSize - spacesCount);
//
//     const result = Object
//         .entries(item)
//         .map(([key, value]) => {
//           return `${openingPadding}${key}: ${iter(value, depth + 1)}`;
//         });
//
//     return [
//         '{',
//         ...result,
//         `${closingPadding}}`,
//     ].join('\n');
//   };
//
//   return iter(data, 1);
// };

const genDiff = (filepath1, filepath2) => {
  const file1 = parse(filepath1);
  const file2 = parse(filepath2);
  const ast = buildAst(file1, file2);
  return ast;
};

export default genDiff;
