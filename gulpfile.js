var gulp = require('gulp');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var less = require('gulp-less');

var bower = {
    fonts: [
        'bower_components/bootstrap/dist/fonts/**',
        "bower_components/font-awesome/fonts/**"
    ],
    scripts: [
        'bower_components/angular/angular.js',
        'bower_components/angular-messages/angular-messages.js',
        'bower_components/angular-resource/angular-resource.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/jquery/dist/jquery.js',
        'bower_components/bootstrap/dist/js/bootstrap.js',
        "bower_components/angular-minieditor/angular-minieditor.js"
    ],
    styles: [
        'bower_components/bootstrap/dist/css/bootstrap.css',
        'bower_components/bootswatch/cosmo/bootstrap.css',
        "bower_components/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css",
        "bower_components/font-awesome/css/font-awesome.css",
        "bower_components/angular-minieditor/angular-minieditor.css"
    ]
};

var sources = {
    scripts: 'sources/scripts/**/*.js',
    styles: 'sources/styles/**/*.less',
    views: 'sources/views/**/*.html'
};

var www = {
    fonts: 'www/fonts',
    scripts: 'www/js',
    styles: 'www/css',
    views: 'www/tpl'
};

gulp.task('bower', function () {
    gulp.src(bower.fonts)
        .pipe(gulp.dest(www.fonts));

    gulp.src(bower.scripts)
        .pipe(concat('lib.js'))
        .pipe(gulp.dest(www.scripts));

    gulp.src(bower.styles)
        .pipe(concat('lib.css'))
        .pipe(gulp.dest(www.styles));
});

gulp.task('script', function () {
    gulp.src(sources.scripts)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(www.scripts));
});

gulp.task('style', function () {
    gulp.src(sources.styles)
        .pipe(less())
        .pipe(concat('app.css'))
        .pipe(gulp.dest(www.styles));
});

gulp.task('view', function () {
    gulp.src(sources.views)
        .pipe(gulp.dest(www.views));
});

gulp.task('default', ['script', 'style', 'view'], function () {
    connect.server({
        root: 'www',
        port: 3001,
        host: 'localhost',
        fallback: 'www/index.html'
    });

    gulp.watch(sources.scripts, ['script']);
    gulp.watch(sources.styles, ['style']);
    gulp.watch(sources.views, ['view']);
});