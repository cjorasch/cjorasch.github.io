module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Concatenate files that are to be combined
        concat: {
            css: {
                src: [
                    'css/combined/*.css'
                ],
                dest: 'css/combined.css'
            },
            js: {
                src: [
                    'js/combined/jquery.min.js',
                    'js/combined/js/*.js',
                    'js/combined/custom.js'
                ],
                dest: 'js/combined.js'
            }
        },

        // Minify the css
        cssmin: {
            css: {
                src: 'css/combined.css',
                dest: 'css/combined.min.css'
            }
        },

        // Minify the js
        uglify: {
            js: {
                files: {
                    'js/combined.min.js': ['js/combined.js']
                }
            }
        },

        // Watch for changes to source files and re-generate combined files
        watch: {
            files: ['css/combined/*', 'js/combined/*'],
            tasks: ['concat', 'cssmin', 'uglify']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['concat:css', 'cssmin:css', 'concat:js', 'uglify:js']);
};