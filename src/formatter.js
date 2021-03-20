import getStylish from './formatters/stylish.js';

const getFormattedTree = (ast, format = '') => {
  switch (format) {
    case 'stylish':
      return getStylish(ast);
    default:
      throw new Error(`Unknown format: '${format}'!`);
  }
};

export default getFormattedTree;
