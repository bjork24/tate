module.exports = function(grunt) {

  'use strict';

  require('load-grunt-config')(grunt, {
    configPath: require('path').join(process.cwd(), 'grunt'),
    init: true,
    loadGruntTasks: {
      pattern: 'grunt-*',
      config: require('./package.json'),
      scope: 'devDependencies'
    }
  });
  
};