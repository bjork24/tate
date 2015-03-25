'use strict';

var fs = require('fs');
var path = require('path');
var glob = require('glob-all');
var sass = require('node-sass');
var prettyBytes = require('pretty-bytes');
var gzipSize = require('gzip-size');
var chalk = require('chalk');
var cssParse = require('css-parse');
var appRoot = require('app-root-path');

var watch = ['**/*.scss'];
var ignoreDir = ['node_modules', 'grunt'].map(function(n) { return '!' + n + '/**'; });
var dirs = watch.concat(ignoreDir);

var files = glob.sync(dirs);

files.forEach(function(sassFile){
  var css = sass.renderSync({
    file: sassFile,
    outputStyle: 'compressed'
  });
  // if (css.css) {
    console.log(chalk.red(sassFile));
    console.log(appRoot);
    console.log(css.stats.entry);
    console.log(css.stats.includedFiles);
    var rawCss = css.css;
    var size = rawCss.length;
    var gSize = gzipSize.sync(rawCss);
    console.log(prettyBytes(size));
    console.log(prettyBytes(gSize));
    var parsed = cssParse(rawCss);
    parsed.stylesheet.rules.forEach(function(rule){
      // console.log(rule.selectors);
    });
  // }
});

// glob.sync(dirs, function (error, files) {
//   files.forEach(function(sassFile){
//     console.log(sassFile);
//     sass.render({
//       file: sassFile
//     }, function(error, result){
//       console.log('done');
//       if (error) {
//         console.log(error.status); // used to be "code" in v2x and below
//         console.log(error.column);
//         console.log(error.message);
//         console.log(error.line);
//       } else {
//         console.log(result.css.toString());
//         console.log(result.stats);
//         console.log(result.map.toString());
//         // or better
//         console.log(JSON.stringify(result.map)); // note, JSON.stringify accepts Buffer too
//       }
//     });
//   });
// });