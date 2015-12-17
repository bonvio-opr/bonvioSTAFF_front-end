var gulp = require('gulp'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    directorySync = require('gulp-directory-sync'),
    minifyCss = require('gulp-minify-css'),
    ngAnnotate = require('gulp-ng-annotate'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify');

// Файлы для обработки
var files = {
    images: '/**/*',
    scripts: '/**/*.js',
    styles: '/main.css',
    templates: '/**/*.html'
};

// Папки исходников
var sources = {
    images: '../images',
    scripts: '../scripts',
    styles: '../styles',
    templates: '../templates'
};

// Папки назначения
var www = {
    root: '../../../www/',
    images: '../../../www/img',
    scripts: '../../../www/js',
    styles: '../../../www/css',
    fonts: '../../../www/fonts',
    templates: '../../../www/tpl'
};

// Вендоры
var vendors = {
    scripts: [
        'bower_components/angular/angular.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-resource/angular-resource.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/angular-touch/angular-touch.js',
        'bower_components/jquery/dist/jquery.js',
        'bower_components/bootstrap/dist/js/bootstrap.js',
        'bower_components/modernizr/modernizr.js'
    ],
    styles: [
        'bower_components/bootstrap/dist/css/bootstrap.css',
        'bower_components/normalize.css/normalize.css'//,
        //'bower_components/animate.css/animate.css'
        //'bower_components/bootswatch/cerulean/bootstrap.css'
    ],
    fonts: [
        'bower_components/bootstrap/dist/fonts/**'//,
        //'bower_components/bootswatch/fonts/**'
    ]
};

// Библиотеки
gulp.task('library', function () {
    gulp.src(vendors.scripts) // исходники
        .pipe(sourcemaps.init()) // инициализация карт
        .pipe(concat('lib.min.js')) // конкатенация
        .pipe(uglify()) // минификация
        .pipe(sourcemaps.write()) // запись карт
        .pipe(gulp.dest(www.scripts)); // сохранение

    gulp.src(vendors.styles) // исходники
        .pipe(concat('lib.min.css')) // конкатенация
        .pipe(minifyCss()) // минификация
        .pipe(gulp.dest(www.styles)); // сохранение

    gulp.src(vendors.fonts)
        .pipe(gulp.dest(www.fonts));
});

// Картинки
gulp.task('image', function () {
    gulp.src(sources.images + files.images) // исходники
        .pipe(gulp.dest(www.images)) // сохранение
        .pipe(directorySync(sources.images, www.images)); // синхронизация
});

// Скрипты
gulp.task('script', function () {
    gulp.src(sources.scripts + files.scripts) // исходники
        .pipe(sourcemaps.init()) // инициализация карт
        .pipe(concat('app.min.js')) // конкатенация
        .pipe(ngAnnotate()) // аннотации
        .pipe(uglify()) // минификация
        .pipe(sourcemaps.write()) // запись карт
        .pipe(gulp.dest(www.scripts)); // сохранение
});

// Стили
gulp.task('style', function () {
    gulp.src(sources.styles + files.styles) // исходники
        .pipe(concat('app.min.css')) // конкатенация
        .pipe(minifyCss()) // минификация
        .pipe(gulp.dest(www.styles)); // сохранение
});

// Шаблоны
gulp.task('template', function () {
    gulp.src(sources.templates + files.templates) // исходники
        .pipe(gulp.dest(www.templates)) // сохранение
        .pipe(directorySync(sources.templates, www.templates)); // синхронизация
});

// Сервер и отслеживание изменений
gulp.task('default', ['library', 'image', 'script', 'style', 'template'], function () {
    connect.server({
        root: www.root,
        port: 3000,
        host: '127.0.0.1',
        fallback: www.root + 'index.html'
    });

    gulp.watch(sources.scripts + files.scripts, ['script']);
    gulp.watch(sources.styles + files.styles, ['style']);
    gulp.watch(sources.templates + files.templates, ['template']);
});