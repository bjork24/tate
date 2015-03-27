'use strict';

var sass = require('node-sass');
var less = require('less');
var path = require('path');
var _ = require('lodash');
var prettyBytes = require('pretty-bytes');
var gzipSize = require('gzip-size');
var u = require('./utils');
var CleanCSS = require('clean-css');
var asyncblock = require('asyncblock');

module.exports = {

  it: function(){
    var self = this;
    _.forEach(global.tate.data, function(n, file){
      var ext = path.extname(file).replace('.','');
      self[ext](file);
    });
  },

  less: function(file){
    var self = this;
    asyncblock(function(flow){
      var rawLESS = u.read(file);
      var lessOpts = {
        isSync: true,
        syncImport: true,
        filename: path.resolve(file)
      };
      var compiled = flow.sync( less.render(rawLESS, lessOpts, flow.callback()) );
      self.parseCSS(compiled.css, file, compiled.imports);
    });
  },

  sass: function(file){
    var compiled = sass.renderSync({ file: file });
    this.parseCSS(compiled.css, file, compiled.stats.includedFiles);
  },

  scss: function(file){ this.sass(file); },

  css: function(file){
    var rawCSS = u.read(file);
    this.parseCSS(rawCSS, file);
  },

  parseCSS: function(rawCSS, file, includedFiles){
    includedFiles = ( u.is.undefined(includedFiles) ) ? false : includedFiles ; 
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
    if ( includedFiles ) {
      _.chain(includedFiles)
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
    }
  }

};