'use strict';

var sass = require('node-sass');
var path = require('path');
var _ = require('lodash');
var prettyBytes = require('pretty-bytes');
var gzipSize = require('gzip-size');
var u = require('./utils');
var CleanCSS = require('clean-css');

module.exports = {

  it: function(){
    var self = this;
    _.forEach(global.tate.data, function(n, file){
      var ext = path.extname(file).replace('.','');
      self[ext](file);
    });
  },

  parseCSS: function(rawCSS, file){
    rawCSS = rawCSS.replace(/\r\n/g, '\n');
    var compiledCSS = new CleanCSS().minify(rawCSS).styles;
    _.extend(global.tate.data[file], {
      css: rawCSS,
      size: {
        full: ( rawCSS.length ) ? prettyBytes(rawCSS.length) : 0 ,
        mini: ( compiledCSS.length ) ? prettyBytes(compiledCSS.length) : 0 ,
        gzip: ( compiledCSS.length ) ? prettyBytes(gzipSize.sync(compiledCSS)) : 0
      }
    });
  },

  sass: function(file){
    var compiled = sass.renderSync({ file: file });
    this.parseCSS(compiled.css, file);
    // unique to sass
    var includedFiles = _.chain(compiled.stats.includedFiles)
    .map(function(path){ return path.replace(process.cwd() + '/',''); })
    .pull(file)
    .value()
    .forEach(function(importedFile){
      if ( _.has(global.tate.data[importedFile], 'importedBy') ) {
        global.tate.data[importedFile].importedBy.push(file);
      } else {
        _.extend(global.tate.data[importedFile], { importedBy: [file]});
      }
    });
  },

  scss: function(file){ this.sass(file); },

  css: function(file){
    var rawCSS = u.read(file);
    this.parseCSS(rawCSS, file);
  }

};