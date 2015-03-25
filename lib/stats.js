'use strict';

var cssParse = require('css-parse');
var _ = require('lodash');
var u = require('./utils');

module.exports = {

  it: function(){
    _.forEach(global.tate.data, function(data, file){
      var stats = {};
      var parsed = cssParse(data.css);
      stats.rules = parsed.stylesheet.rules.length;
      stats.selectors = 0;
      parsed.stylesheet.rules.forEach(function(rule){
        stats.selectors += rule.selectors.length;
      });
      _.extend(global.tate.data[file], { stats: stats });
    });
  }

};