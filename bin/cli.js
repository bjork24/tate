#!/usr/bin/env node

'use strict';

var cli = require('commander');
var chalk = require('chalk');

function list(val) {
  return val.split(',');
}

cli
  .version(require('../package.json').version)
  .option('-d, --directories [path]', 'Paths to ignore, comma seperated', list)
  .parse(process.argv);

if (!cli.directories) {
  console.log(chalk.red('\n No directory specified.'));
  cli.help();
}