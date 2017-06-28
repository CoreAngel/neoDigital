const gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer');


gulp.task('sass', function () {
    return gulp.src(['sass/**/style.scss', '!sass/normalize.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({stream: true}));
});


gulp.task('watch', ['sass'], function () {
    browserSync.init({
        server: {
            baseDir: ""
        }
    });

    gulp.watch(['sass/**/*.scss'], ['sass']);
    gulp.watch(['*', '!sass/**/*', '!css/**/*']).on('change', browserSync.reload);
});