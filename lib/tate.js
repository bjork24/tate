'use strict';

var glob = require('glob');
var sass = require('node-sass');
var prettyBytes = require('pretty-bytes');
var gzipSize = require('gzip-size');
var cssParse = require('css-parse');
var appRoot = require('app-root-path');

// var ignoreDir = ['node_modules', 'grunt'].map(function(n) { return n + '/**'; }); 

// var files = glob.sync('*(node_modules|test)/**/*.+(scss|sass)');

function tate(files, opts) {
  console.log(files);
  console.log(opts);
}

// files.forEach(function(sassFile){
//   var css = sass.renderSync({
//     file: sassFile,
//     outputStyle: 'compressed'
//   });
//   // if (css.css) {
//     console.log(chalk.red(sassFile));
//     console.log(appRoot);
//     console.log(css.stats.entry);
//     console.log(css.stats.includedFiles);
//     var rawCss = css.css;
//     var size = rawCss.length;
//     var gSize = gzipSize.sync(rawCss);
//     console.log(prettyBytes(size));
//     console.log(prettyBytes(gSize));
//     var parsed = cssParse(rawCss);
//     parsed.stylesheet.rules.forEach(function(rule){
//       // console.log(rule.selectors);
//     });
//   // }
// });

module.exports = tate;