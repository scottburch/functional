module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: ['src/base.js', 'src/monad.js', 'src/autocurry.js', 'src/*.js'],
                dest: 'build/functional.min.js'
            }
        },
        jasmine: {
            pivotal: {
                src: ['src/base.js','src/monad.js', 'src/autocurry.js', 'src/*.js'],
                options: {
                    specs: 'spec/*Spec.js',
                    helpers: 'spec/*Helper.js',
                    vendor: [
                        "vendor/*.js"
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('default', ['uglify']);
};