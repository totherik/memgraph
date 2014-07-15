'use strict';

var del = require('del');
var gulp = require('gulp');
var less = require('gulp-less');
var through = require('through2');
var reactjs = require('react-tools');
var spawn = require('child_process').spawn;
var modules = require('gulp-es6-module-transpiler');


var paths = {
    html: 'static/**/*.html',
    js: ['static/js/**/*.js', '!static/js/lib/**/*.js'],
    css: 'static/**/*.less',
    dist: 'dist'
};


function react(options) {
    return through.obj(function (file, enc, cb) {
        if (!file.isNull()) {
            try {
                file.contents = new Buffer(reactjs.transform(file.contents.toString(), options));
                this.push(file);
            } catch (err) {
                this.emit('error', err);
            }
        }
        cb();
    });
}


gulp.task('clean', function (cb) {
    del(['dist/**/'], cb);
});


gulp.task('copy', ['clean'], function () {
    return gulp.src(paths.html)
        .pipe(gulp.dest(paths.dist));
});


gulp.task('copy-lib', ['clean'], function () {
    return gulp.src('static/js/lib/**/*.js')
        .pipe(gulp.dest('dist/js/lib'));
});


gulp.task('scripts', ['clean'], function () {
    return gulp.src(paths.js)
        .pipe(react({
            'harmony': true,
            'relativize': false,
            'no-cache-dir': true
        }))
        .pipe(modules({
            type: 'amd'
        }))
        .pipe(gulp.dest(paths.dist + '/js'));
});


gulp.task('less', ['clean'], function () {
    return gulp.src('static/css/app.less')
        .pipe(less())
        .pipe(gulp.dest(paths.dist + '/css'));
});


gulp.task('watch', function () {
    gulp.watch('static/**/*', ['build']);
});


gulp.task('server', function () {
    spawn('npm', ['run', 'start'], { stdio: 'inherit' });
});


gulp.task('build', ['clean', 'copy', 'copy-lib', 'scripts', 'less']);
gulp.task('default', ['server', 'watch', 'build']);
