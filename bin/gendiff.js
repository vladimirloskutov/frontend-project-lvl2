#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<path1> <path2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((path1, path2) => console.log(genDiff(path1, path2, program.opts().format)))
  .parse();
