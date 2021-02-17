import fs from 'fs';
import genDiff from '../src/index.js';

test('json', () => {
  const before = './__fixtures__/file1.json';
  const after = './__fixtures__/file2.json';
  const expected = fs.readFileSync(new URL('../__fixtures__/expected', import.meta.url), 'utf8');

  expect(genDiff(before, after)).toEqual(expected);
});
