'use strict';

var chalk = require('chalk');
var fs = require('fs');

module.exports = {

  log: {
    warn: function(msg) { console.log(chalk.bgRed.white(' WARNING ') + ' ' + chalk.red(msg)); }
  },

  is: {
    file: function(test) { return fs.lstatSync(test).isFile(); },
    directory: function(test) { return fs.lstatSync(test).isDirectory(); },
    undefined: function(test) { return typeof test === 'undefined'; }
  }

};