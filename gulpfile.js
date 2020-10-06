'use strict';

//include gulp plugin
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    //for clean task
    del = require('del'),
    //compress image file
    imagemin = require('gulp-imagemin'),
    //for compress all file into one file
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cleanCss = require('gulp-clean-css'),
    flatmap = require('gulp-flatmap'),
    htmlmin = require('gulp-htmlmin');

//sass task
gulp.task('sass', function () {
    return gulp.src('./css/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./css'));
  });
  
  gulp.task('sass:watch', function () {
    gulp.watch('./css/*.scss', ['sass']);
  });
  
  gulp.task('browser-sync', function () {
     var files = [
        './*.html',
        './css/*.css',
        './img/*.{png,jpg,gif}',
        './js/*.js'
     ];
  
     browserSync.init(files, {
        server: {
           baseDir: "./"
        }
     });
  
  });
  
  // Default task
  gulp.task('default', ['browser-sync'], function() {
      gulp.start('sass:watch');
  });

  // Clean file in dist folder (do before replace the folder with gulp file)
   gulp.task('clean', function() {
      return del(['dist']);
   });

   //copy font file into dist.fonts file
   gulp.task('copyfonts', function() {
      gulp.src('./node_modules/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
      .pipe(gulp.dest('./dist/fonts'));
   });

   // compress image file into dist/image file
   gulp.task('imagemin', function() {
      return gulp.src('img/*.{png,jpg,gif}')
      .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
      .pipe(gulp.dest('dist/img'));
   });

   //compress all code into one file
   gulp.task('usemin', function() {
      return gulp.src('./*.html')
      .pipe(flatmap(function(stream, file){
         return stream
         .pipe(usemin({
             css: [ rev() ],
             html: [ function() { return htmlmin({ collapseWhitespace: true })} ],
             js: [ uglify(), rev() ],
             inlinejs: [ uglify() ],
             inlinecss: [ cleanCss(), 'concat' ]
         }))
      }))
      .pipe(gulp.dest('dist/'));
   });

   //clean dist folder and replace with gulp file
   gulp.task('build',['clean'], function() {
      gulp.start('copyfonts','imagemin','usemin');
  });

  