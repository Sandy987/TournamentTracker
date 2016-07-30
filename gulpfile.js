
let gulp = require('gulp'),
  rimraf = require('rimraf'),
  concat = require('gulp-concat'),
  cssmin = require('gulp-cssmin'),
  uglify = require('gulp-uglify'),
  gutil = require('gulp-util'),
  sass = require('gulp-sass'),
  webpack = require('webpack'),
  concatCss = require('gulp-concat-css');

let webroot = './wwwroot/';

let paths = {
  js: './src/JsSrc/**/*.js*', // TODO: Does this work?
  sass: './src//SCSS/**/*.scss',
  concatJsDest: webroot + 'js/',
  concatCssDest: webroot + 'css/',
  imageSrc: './src//Img/*',
  imageDest: webroot + 'img/',
};

gulp.task('clean:js', function (cb) {
  rimraf(paths.concatJsDest, cb);
});

gulp.task('clean:css', function (cb) {
  rimraf(paths.concatCssDest, cb);
});

gulp.task('clean:img', function (cb) {
  rimraf(paths.imageDest, cb);
});

gulp.task('clean', ['clean:js', 'clean:css', 'clean:img']);

gulp.task('webpack', function (callback) {
    // run webpack
  webpack(require('./webpack.config.js'), function (err, stats) {
    if (err) throw new gutil.PluginError('webpack', err);
    if (stats.hasWarnings()) {
      gutil.log('[webpack]', stats.toString({
            // output options
      }));
    }
    callback();
  });
});

gulp.task('webpack:watch', function () {
  gulp.watch(paths.js, ['webpack']);
});

gulp.task('sass', function () {
  return gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(concatCss('site.css'))
    .pipe(gulp.dest(paths.concatCssDest));
});

gulp.task('imgpack', function () {
  return gulp.src(paths.imageSrc)
    .pipe(gulp.dest(paths.imageDest));
});

gulp.task('sass:watch', function () {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('build', ['clean', 'webpack', 'sass', 'imgpack']);

gulp.task('watch', ['webpack:watch', 'sass:watch']);
