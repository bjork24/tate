'use strict';

var _ = require('lodash');
var u = require('./utils');
var hbs = require('handlebars');
var path = require('path');

module.exports = {

  it: function(){
    var self = this;
    global.tate.opts.output.forEach(function(output){
      self[output]();
    });
  },

  append: function(){
    _.forEach(global.tate.data, function(data, file){
      var ext = path.extname(file).replace('.','');
      var content = u.read(file);
      var lines = content.replace(/\r\n/g, '\n').split(/\n/);
      var comments = {
        start: ( ext !== 'css' ) ? '//' : '/*' ,
        end: ( ext !== 'css' ) ? '' : '*/' ,
        tate: {
          start: 'TATE INFO START',
          end: 'TATE INFO END'
        }
      };
      var hasInfo = _.findIndex(lines, function(l){ return l.match(comments.tate.start); });
      if ( hasInfo > 0 ) { lines = _.take(lines, hasInfo-1); }
      lines.push('');
      lines.push(comments.start + ' ' + comments.tate.start + ' ' + comments.end);
      lines.push(comments.start);
      lines.push(comments.start + ' minified    : ' + data.size.mini);
      lines.push(comments.start + ' gzipped     : ' + data.size.gzip);
      lines.push(comments.start + ' rules       : ' + data.stats.rules);
      lines.push(comments.start + ' selectors   : ' + data.stats.selectors);
      if ( data.importedBy ) {
        lines.push(comments.start);
        lines.push(comments.start + ' imported by :');
        data.importedBy.forEach(function(importedBy){
          lines.push(comments.start + ' - ' + importedBy);
        });
      }
      lines.push(comments.start);
      lines.push(comments.start + ' ' + comments.tate.end + ' ' + comments.end);
      u.write(file, lines.join('\r\n'));
      u.log.success('Successfully appended ' + file);
    });
  },

  manifest: function(){
    var writeTo = './tate.md';
    var templateData = { files: [] };
    _.forEach(global.tate.data, function(data, file){
      templateData.files.push({
        file: file,
        mini: data.size.mini,
        gzip: data.size.gzip,
        rules: data.stats.rules,
        selectors: data.stats.selectors,
        importedBy: data.importedBy
      });
    });
    var manifest = u.render('assets/manifest.hbs', templateData);
    u.write(writeTo, manifest);
    u.log.success('Manifest successfully written to ' + writeTo);
  },

  terminal: function(){
    _.forEach(global.tate.data, function(data, file){
      u.log.file(file);
      u.log.property('minified', '.....', data.size.mini);
      u.log.property('gzipped', '......', data.size.gzip);
      u.log.property('rules', '........', data.stats.rules);
      u.log.property('selectors', '....', data.stats.selectors);
      if ( data.importedBy ) {
        u.log.imported(data.importedBy);
      }
      console.log('');
    });
  }

};