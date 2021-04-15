import toStylish from './stylish.js';
import toPlain from './plain.js';

export default (ast, format) => {
  switch (format) {
    case 'stylish':
      return toStylish(ast);
    case 'plain':
      return toPlain(ast);
    case 'json':
      return JSON.stringify(ast);
    default:
      throw new Error(`Unknown format: ${format}!`);
  }
};
