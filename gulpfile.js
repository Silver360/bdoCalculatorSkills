'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    run = require('gulp-run'),
    electron = require('electron-connect').server.create();


gulp.task('sass', function() {
    return gulp.src('public/css/**/*.scss')
        .pipe(sass())
        .on('error', onError)
        .pipe(gulp.dest('public/build/'))
});

gulp.task('js:concat', function() {
    return gulp.src('public/js/**/*.js')
        .pipe(concat('main.js'))
        .on('error', onError)
        .pipe(gulp.dest('public/build/'));
});

gulp.task('js:uglify', function() {
    return gulp.src('public/build/main.js')
        .pipe(uglify())
        .on('error', onError)
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('public/build/'));
});

gulp.task('css', function () {
    return gulp.src('public/build/style.css')
        .pipe(sourcemaps.init())
        .pipe(cssnano())
        .on('error', onError)
        .pipe(rename('style.min.css'))
        .pipe(sourcemaps.write('.'))
        .on('error', onError)
        .pipe(rename('style.css.map'))
        .pipe(gulp.dest('public/build/'));
});

gulp.task('build:project', ['sass', 'css', 'js:concat', 'js:uglify'], function(){
    console.log('Buduje Projekt');
});

gulp.task('watch', function() {
    gulp.watch('public/css/**/*.scss', ['sass', electron.reload]);
    gulp.watch('public/build/style.css', ['css']);
    gulp.watch('public/js/**/*.js', ['js:concat', electron.reload]);
    gulp.watch('public/build/main.js', ['js:uglify']);
});

gulp.task('run', ['build:project', 'watch'], function() {
    return electron.start();
});


/* Handler error */

function onError(err) {
    console.log(err);
    this.emit('end');
}

