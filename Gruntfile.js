/*
 *  Likedown - v1.0.0 - Gruntfile.js
 * home: http://likedown.chiki.org/
 * Copyright (c) 2015 XiaoKu Inc. All Rights Reserved.
 */

'use strict';

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('likedown.json'),

        banner: '/*\n * <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? " * home: " + pkg.homepage + "\\n" : "" %>' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>' +
            ' All Rights Reserved.\n */\n',

        clean: {
            files: [
                'dist/js/*.js',
                'dist/css/*.css',
                'dist/img',
            ],
        },

        uglify: {
            options: {
                banner: '<%= banner %>',
            },
            dist: {
                src: [
                    'src/js/likedown.js',
                ],
                dest: 'dist/js/likedown.min.js',
            },
        },

        jshint: {
            js: {
                options: {
                    jshintrc: 'src/js/.jshintrc',
                },
                src: 'src/js/likedown.js',
            },
        },

        less: {
            options: {
                banner: '<%= banner %>',
            },
            dist: {
                files: {
                    'dist/css/likedown.css': 'src/less/likedown.less',
                },
            },
        },

        cssmin: {
            optioins: {
                banner: '<%= banner %>',
            },
            dist: {
                files: {
                    'dist/css/likedown.min.css': 'dist/css/likedown.css',
                },
            },
        },

        watch: {
            js: {
                files: '<%= jshint.js.src %>',
                tasks: ['jshint:js', 'uglify'],
            },
            css: {
                files: 'src/less/likedown.less',
                tasks: ['less', 'cssmin'],
            },
        },

        copy: {
            fonts: {
                expand: true,
                src: 'img/**',
                dest: 'dist/',
            },
        },
    });

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.registerTask('dist-css', ['less', 'cssmin']);
    grunt.registerTask('dist-js', ['uglify']);
    grunt.registerTask('dist-copy', ['copy']);
    grunt.registerTask('build', ['clean', 'dist-css', 'dist-js', 'dist-copy']);
    grunt.registerTask('default', ['build']);

};