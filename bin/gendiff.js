#!/usr/bin/env node

import { program } from 'commander';

// Здесь сразу вопрос по поводу статьи скрипты/модули, стоит ли код хэлпа размещать здесь?
program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .parse();
