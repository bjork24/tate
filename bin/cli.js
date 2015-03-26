#!/usr/bin/env node

'use strict';

var _ = require('lodash');
var cli = require('commander');
var tate = require('../lib/tate');
var u = require('../lib/utils');

cli
  .version(require('../package.json').version)
  .usage('[options] <file ...>')
  .option('-s, --sass', 'Annotate .sass and .scss files')
  .option('-l, --less', 'Annotate .less files')
  .option('-y, --styl', 'Annotate .styl files')
  .option('-c, --css', 'Annotate .css files')
  .option('-a, --append', 'Output is appended to each matching file')
  .option('-m, --manifest', 'Output is saved to a manifest file')
  .option('-t, --terminal', 'Output is displayed in terminal only')
  .parse(process.argv);

var opts = {};

if ( cli.args.length ) {
  var files = cli.args;
} else {
  u.log.warn('No input file or directory specified.');
  cli.help();
}

var ext = [];
if ( cli.sass || cli.less || cli.styl || cli.css ) {
  if (cli.sass) { ext.push('sass', 'scss'); }
  if (cli.less) { ext.push('less'); }
  if (cli.styl) { ext.push('styl'); }
  if (cli.css)  { ext.push('css'); }
} else {
  u.log.warn('No file type specified. Defaulting to .css');
  ext.push('css');
}
_.extend(opts, { ext: ext });

var output = [];
if ( cli.append || cli.manifest || cli.terminal ) {
  if (cli.append) { output.push('append'); }
  if (cli.manifest) { output.push('manifest'); }
  if (cli.terminal)  { output.push('terminal'); }
} else {
  u.log.warn('No output type specified. Defaulting to terminal');
  output.push('terminal');
}
_.extend(opts, { output: output });

tate.it(files, opts);