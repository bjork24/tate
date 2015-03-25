'use strict';

var chalk = require('chalk');
var fs = require('fs');

module.exports = {

  log: {
    warn: function(msg) {
      console.log('\n %s %s \n', chalk.bgRed.white(' WARNING '), chalk.red(msg));
    },
    file: function(msg) {
      console.log('\n%s\n', chalk.bgBlue.white(' ', msg, ' '));
    },
    property: function(prop, spacer, val) {
      console.log(' %s %s %s', chalk.dim(prop), chalk.dim(spacer), chalk.white(val));
    },
    imported: function(files) {
      console.log('');
      console.log(chalk.dim(' imported by:'));
      files.forEach(function(file){
        console.log('  %s%s', chalk.dim('-'), chalk.white(file));
      });
    }
  },

  is: {
    file: function(test) { return fs.lstatSync(test).isFile(); },
    directory: function(test) { return fs.lstatSync(test).isDirectory(); },
    undefined: function(test) { return typeof test === 'undefined'; }
  }

};