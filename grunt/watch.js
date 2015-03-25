module.exports = {
  grunt: {
    files: ['Gruntfile.js','grunt/*.js'],
    tasks: ['jshint:grunt']
  },
  cli: {
    files: ['bin/*.js'],
    tasks: ['jshint:cli']
  },
  lib: {
    files: ['lib/*.js'],
    tasks: ['jshint:lib']
  }
};