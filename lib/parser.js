'use strict';

var sass = require('node-sass');
var path = require('path');
var appRoot = require('app-root-path').path;
var _ = require('lodash');
var prettyBytes = require('pretty-bytes');
var gzipSize = require('gzip-size');
var u = require('./utils');

module.exports = {

  it: function(){
    var self = this;
    _.forEach(global.data, function(n, file){
      var ext = path.extname(file);
      if ( ext === '.scss' || ext === '.sass' ) {
        self.sass(file);    
      }
    });
  },

  sass : function(file){
    var compiled = sass.renderSync({
      file: file,
      outputStyle: 'compressed'
    });
    var css = compiled.css;
    _.extend(global.data[file], {
      size: {
        mini: ( css.length ) ? prettyBytes(css.length) : 0 ,
        gzip: ( css.length ) ? prettyBytes(gzipSize.sync(css)) : 0
      }
    });
    var includedFiles = _.chain(compiled.stats.includedFiles)
      .map(function(path){ return path.replace(appRoot + '/',''); })
      .pull(file)
      .value()
      .forEach(function(importedFile){
        if ( _.has(global.data[importedFile], 'importedBy') ) {
          global.data[importedFile].importedBy.push(file);
        } else {
          _.extend(global.data[importedFile], { importedBy: [file]});
        }
      });
  }

};