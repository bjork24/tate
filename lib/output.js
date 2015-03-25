'use strict';

var _ = require('lodash');
var u = require('./utils');
var hbs = require('handlebars');

module.exports = {

  it: function(){
    var self = this;
    global.tate.opts.output.forEach(function(output){
      self[output]();
    });
  },

  manifest: function(){
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
    var manifest = u.render('/assets/manifest.hbs', templateData);
    u.write('/tate.md', manifest);
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
  },

  append: function(){
    console.log('append');
  }

};