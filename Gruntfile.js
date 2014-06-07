'use strict';

module.exports = function(grunt) {
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),


    watch: {
      files: ['www/**/*', '!www/js/bundle.js'],
      tasks: ['build'],
      options: {
        'event': ['all']
      }
    },

    browserSync: {
      dev: {
        bsFiles: {
          src : 'www/**'
        },
        options: {
          watchTask: true,
          server: {
            baseDir: 'www'
          }
        }
      }
    },

    browserify: {
      files: {
        './www/js/bundle.js': ['./www/**/*.js', '!./www/js/bundle.js'],
      },
      options: {
        bundleOptions: {
          'entry': './www/js/app.js'
        }
      }
    },

    column_lint: {
      files: {
        src: ['./www/**/*', '!./www/js/bundle.js']
      },
    },

    bowerInstall: {
      target: {

        // Point to the files that should be updated when
        // you run `grunt bower-install`
        src: [
          './www/index.html'
        ],

        dependencies: true,
        devDependencies: false
      }
    },

    jshint: {
      src: ['Gruntfile.js', './www/**/*.js', '!./www/js/bundle.js'],
      options: {
        jshintrc: './jshintrc.js'
      }
    },

    lintspaces: {
      javascript: {
        src: ['./www/**/*.js', '!./www/js/bundle.js'],
        options: {
          // TODO: Reference editorconfig
          indentation: 'spaces',
          spaces: 2,
          newline: true,
          trailingspaces: true,
          ignores: ['js-comments']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-lintspaces');
  grunt.loadNpmTasks('grunt-column-lint');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-bower-install');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');


  grunt.registerTask('build', ['browserify', 'bowerInstall']);
  grunt.registerTask('format', ['lintspaces', 'jshint']);
  grunt.registerTask('serve', ['browserSync', 'watch']);
};
