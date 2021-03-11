import fs from 'fs';
import genDiff from '../src/index.js';

test('json', () => {
  const before = './__fixtures__/file1.json';
  const after = './__fixtures__/file2.json';
  const expected = fs.readFileSync(new URL('../__fixtures__/expected', import.meta.url), 'utf8');

  expect(genDiff(before, after)).toEqual(expected);
});

test('yaml', () => {
  const before = './__fixtures__/file1.yml';
  const after = './__fixtures__/file2.yml';
  const expected = fs.readFileSync(new URL('../__fixtures__/expected', import.meta.url), 'utf8');

  expect(genDiff(before, after)).toEqual(expected);
});

test('stylish json', () => {
  const before = './__fixtures__/before.json';
  const after = './__fixtures__/after.json';
  const diff = fs.readFileSync(new URL('../__fixtures__/stylishDiff.txt', import.meta.url), 'utf8');

  expect(genDiff(before, after)).toEqual(diff);
});
