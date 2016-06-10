/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    gutil = require("gulp-util"),
    sass = require("gulp-sass"),
    webpack = require("webpack");

var webroot = "./wwwroot/";

var paths = {
    js: "./JsSrc/**/*.js*", //TODO: Does this work?
    sass: "./SCSS/**/*.scss",
    concatJsDest: webroot + "js/",
    concatCssDest: webroot + "css/"
};

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("webpack", function (callback) {
    // run webpack
    webpack( require('./webpack.config.js'), function (err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        // gutil.log("[webpack]", stats.toString({
        //     // output options
        // }));
        callback();
    });
});

gulp.task('webpack:watch', function () {
    gulp.watch(paths.js, ['webpack']);
});

gulp.task('sass', function () {
    return gulp.src(paths.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.concatCssDest));
});

gulp.task('sass:watch', function () {
    gulp.watch(paths.sass, ['sass']);
});

gulp.task("build", ["webpack", "sass"]);

gulp.task("watch", ["webpack:watch", "sass:watch"]);
