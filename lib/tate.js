'use strict';

var u = require('./utils');
var stat = require('./stats');
var parse = require('./parser');
var _ = require('lodash');
var glob = require('glob');

module.exports = {

  it: function(files, opts) {
    var matches = [];
    files.forEach(function(searchIn){
      if ( u.is.file(searchIn) ) {
        matches.push(searchIn);
      } else {
        var results = glob.sync(searchIn + '/**/*.+(' + opts.ext.join('|') + ')');
        matches = matches.concat(results);
      }
    });
    matches = _.uniq(matches).sort();
    if ( !matches.length ) {
      u.log.warn('Couldn\'t find any ' + opts.ext.join(', ') + ' files!');
      return;
    }
    global.data = {};
    matches.forEach(function(file){ global.data[file] = {}; });
    parse.it();
    stat.it();
    //output.it();
  }

};