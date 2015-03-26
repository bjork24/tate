'use strict';

var u = require('./utils');
var stat = require('./stats');
var parse = require('./parser');
var output = require('./output');
var _ = require('lodash');
var glob = require('glob');

module.exports = {

  it: function(files, opts) {
    global.tate = {};
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
    global.tate.data = {};
    global.tate.opts = opts;
    matches.forEach(function(file){ global.tate.data[file] = {}; });
    if ( opts.output[0] === 'erase' ) {
      output.erase();
      return;
    }
    parse.it();
    stat.it();
    output.it();
  }

};