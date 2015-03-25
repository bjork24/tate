'use strict';

var chalk = require('chalk');

module.exports = {

  log: {
    warn: function(msg) { console.log(chalk.bgRed.white(' WARNING ') + ' ' + chalk.red(msg)); }
  }

};