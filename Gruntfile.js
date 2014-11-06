module.exports = function(grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.initConfig({
        concat: {
            dist: {
                src: [
                    'css/modular-header.txt',
                    'css/grid.css',
                    'css/utility.css',
                    'css/colours.css',
                    'css/navigation.css',
                    'css/typography.css',
                    'css/uipatterns.css',
                    'css/forms.css',
                    'css/selects.css',
                    'css/animations.css',
                    'css/overrides.css',
                    'css/fixes.css'
                ],
                dest: 'build/modular.css'
            }
        }
    });

    grunt.registerTask('default', ['concat']);

};
