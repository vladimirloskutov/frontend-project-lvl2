import fs from 'fs';
import genDiff from '../src/index.js';

const beforeJson = './__fixtures__/before.json';
const afterJson = './__fixtures__/after.json';
const beforeYml = './__fixtures__/before.yml';
const afterYml = './__fixtures__/after.yml';

const stylishFormat = 'stylish';
const plainFormat = 'plain';
const jsonFormat = 'json';

const stylishDiff = fs.readFileSync(new URL('../__fixtures__/stylishDiff.txt', import.meta.url), 'utf8');
const plainDiff = fs.readFileSync(new URL('../__fixtures__/plainDiff.txt', import.meta.url), 'utf8');
const jsonDiff = fs.readFileSync(new URL('../__fixtures__/jsonDiff.txt', import.meta.url), 'utf8');

test.each([
  [beforeJson, afterJson, stylishFormat, stylishDiff],
  [beforeYml, afterYml, stylishFormat, stylishDiff],
  [beforeJson, afterJson, plainFormat, plainDiff],
  [beforeYml, afterYml, plainFormat, plainDiff],
  [beforeJson, afterJson, jsonFormat, jsonDiff],
  [beforeYml, afterYml, jsonFormat, jsonDiff],
])('test', (before, after, format, diff) => {
  expect(genDiff(before, after, format)).toEqual(diff);
});
