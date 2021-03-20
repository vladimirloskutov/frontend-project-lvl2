import fs from 'fs';
import genDiff from '../src/index.js';

test('stylish json', () => {
  const before = './__fixtures__/before.json';
  const after = './__fixtures__/after.json';
  const format = 'stylish';
  const diff = fs.readFileSync(new URL('../__fixtures__/stylishDiff.txt', import.meta.url), 'utf8');

  expect(genDiff(before, after, format)).toEqual(diff);
});

test('stylish yml', () => {
  const before = './__fixtures__/before.yml';
  const after = './__fixtures__/after.yml';
  const format = 'stylish';
  const diff = fs.readFileSync(new URL('../__fixtures__/stylishDiff.txt', import.meta.url), 'utf8');

  expect(genDiff(before, after, format)).toEqual(diff);
});

test('plain json', () => {
  const before = './__fixtures__/before.json';
  const after = './__fixtures__/after.json';
  const format = 'plain';
  const diff = fs.readFileSync(new URL('../__fixtures__/plainDiff.txt', import.meta.url), 'utf8');

  expect(genDiff(before, after, format)).toEqual(diff);
});

test('plain yml', () => {
  const before = './__fixtures__/before.yml';
  const after = './__fixtures__/after.yml';
  const format = 'plain';
  const diff = fs.readFileSync(new URL('../__fixtures__/plainDiff.txt', import.meta.url), 'utf8');

  expect(genDiff(before, after, format)).toEqual(diff);
});

test('json json', () => {
  const before = './__fixtures__/before.json';
  const after = './__fixtures__/after.json';
  const format = 'json';
  const diff = fs.readFileSync(new URL('../__fixtures__/jsonDiff.txt', import.meta.url), 'utf8');

  expect(genDiff(before, after, format)).toEqual(diff);
});

test('json yml', () => {
  const before = './__fixtures__/before.yml';
  const after = './__fixtures__/after.yml';
  const format = 'json';
  const diff = fs.readFileSync(new URL('../__fixtures__/jsonDiff.txt', import.meta.url), 'utf8');

  expect(genDiff(before, after, format)).toEqual(diff);
});
