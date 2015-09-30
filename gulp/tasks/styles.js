var gulp = require('gulp');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var cssmin = require('gulp-minify-css');
var sassLint = require('gulp-sass-lint');

var stylesPath = 'assets/stylesheets/';

gulp.task('styles', ['sass-lint'], function() {
  var onError = function(err) {
    notify.onError({
      title: "Gulp",
      subtitle: "Failure!",
      message: "Error: <%= error.message %>",
      sound: "Beep"
    })(err);
    this.emit('end');
  };

  return gulp.src(stylesPath + '**/*.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sass())
    .pipe(prefix())
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(stylesPath));
});

gulp.task('sass-lint', function () {
  gulp.src([stylesPath + '**/*.scss', '!./assets/stylesheets/libs/**/*.scss'])
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

// gulp.task('watch', function() {
//   gulp.watch(stylesPath + '**/*.scss', ['styles', 'reload']);
// });

// gulp.task('default', ['browser-sync', 'watch']);
