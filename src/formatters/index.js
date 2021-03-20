import getStylish from './stylish.js';
import getPlain from './plain.js';

const getFormattedTree = (ast, format) => {
  switch (format) {
    case 'stylish':
      return getStylish(ast);
    case 'plain':
      return getPlain(ast);
    case 'json':
      return JSON.stringify(ast);
    default:
      throw new Error(`Unknown format: ${format}!`);
  }
};

export default getFormattedTree;
