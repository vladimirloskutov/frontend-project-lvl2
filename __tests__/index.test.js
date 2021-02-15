import genDiff from '../src/index.js';

test('plain json', () => {
  const before = '../file1.json';
  const after = '../file2.json';

  const result = `{
    - follow: false
      host: hexlet.io
    - proxy: 123.234.53.22
    - timeout: 50
    + timeout: 20
    + verbose: true
  }`;

  expect(genDiff(before, after)).toEqual(result);
});
