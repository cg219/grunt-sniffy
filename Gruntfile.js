/*
 * grunt-sniffy
 * https://github.com/cg219/sniffy_grunt
 *
 * Copyright (c) 2015 Clemente Gomez
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    sniffy: {
      options: {
        search: {
          "#bg" : "blue.jpg",
          "#copyA" : "darkgrey.png",
          "#copyB" : "gold.png",
          "#another" : "green.png"
        }
      },
      test: {
        src: ["test/imgs"],
        dest: "test/output/img.js"
      }
    },

    sniffyHTML: {
      options: {
        output: "test/img.js",
        sniffy: "test/sniffy.js"
      },
      test: {
        files: {
          "test/output/test2.html" : ["test/test2.html"]
        }
      }
    },

    sniffyCSS: {
      test: {
        files: {
          "test/output/test.css" : ["test/test.css"]
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'sniffy', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
