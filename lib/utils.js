'use strict';

var chalk = require('chalk');
var fs = require('fs');
var appRoot = require('app-root-path');
var hbs = require('handlebars');

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
    },
    success: function(msg) {
      console.log('\n%s\n', chalk.green.bold.underline(' ', msg, ' '));
    }
  },

  is: {
    file: function(test) { return fs.lstatSync(test).isFile(); },
    directory: function(test) { return fs.lstatSync(test).isDirectory(); },
    undefined: function(test) { return typeof test === 'undefined'; }
  },

  render: function(file, data) {
    file = ( file.charAt(0) !== '/' ) ? '/' + file : file ;
    var source = this.read(appRoot + file);
    var template = hbs.compile(source);
    return template(data);
  },

  read: function(file) {
    return fs.readFileSync(file, { encoding: 'utf8' });
  },

  write: function(file, data) {
    fs.writeFileSync(file, data, { encoding: 'utf8' });
  }

};