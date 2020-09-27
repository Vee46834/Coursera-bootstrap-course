'use strict';

module.exports = function (grunt) {
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt);

    // Define the configuration for all the tasks
    //in the initConfig >> syntax are like in the package.json file
    grunt.initConfig({
        
        //sass task : create 'css/styles.css' from 'css/styles.scss'
        sass: {
            dist: {
                files: {
                    'css/styles.css': 'css/styles.scss'
                }
            }
        },

        //watch task : watch the update on file:css/scss for task:[sass] >> update everytime scss file is saved
        watch: {
            files: 'css/*.scss',
            tasks: ['sass']
        },

        //browserSync task
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                //if [watch] see the update >> browser will reload automatically
                options: {
                    watchTask: true,
                    server: {
                        baseDir: "./"
                    }
                }
            }
        }
    });

    //name of task ( cmd >> grunt css >> run sass task)
    grunt.registerTask('css', ['sass']);
    //always run ['browserSync'],['watch'] task everytime you run grunt program on cmd
    //dafault is similar to main
    grunt.registerTask('default',['browserSync','watch']);
};