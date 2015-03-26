'use strict';

var _ = require('lodash');
var u = require('./utils');
var config = require('./config');
var hbs = require('handlebars');
var path = require('path');

module.exports = {

  it: function(){
    var self = this;
    global.tate.opts.output.forEach(function(output){
      self[output]();
    });
  },

  bustFile: function(file){
    var content = u.read(file);
    return content.replace(/\r\n/g, '\n').split(/\n/);
  },

  erase: function(){
    var self = this;
    _.forEach(global.tate.data, function(data, file){
      var lines = self.bustFile(file);
      var hasInfo = _.findIndex(lines, function(l){ return l.match(config.appendStart); });
      if ( hasInfo > 0 ) {
        lines = _.take(lines, hasInfo-1);
      } else {
        return;
      }
      u.write(file, lines.join('\r\n'));
      u.log.success('Successfully erased tates from ' + file);
    });
  },

  append: function(){
    var self = this;
    _.forEach(global.tate.data, function(data, file){
      var lines = self.bustFile(file);
      var ext = path.extname(file).replace('.','');
      var comments = {
        start: ( ext !== 'css' ) ? '//' : '/*' ,
        end: ( ext !== 'css' ) ? '' : '*/'
      };
      var hasInfo = _.findIndex(lines, function(l){ return l.match(config.appendStart); });
      if ( hasInfo > 0 ) { lines = _.take(lines, hasInfo-1); }
      lines.push('');
      lines.push(comments.start + ' ' + config.appendStart + ' ' + comments.end);
      lines.push(comments.start);
      lines.push(comments.start + ' nested      : ' + data.size.full);
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
      lines.push(comments.start + ' ' + config.appendEnd + ' ' + comments.end);
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
        full: data.size.full,
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
      u.log.property('nested', '....,..', data.size.full);
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