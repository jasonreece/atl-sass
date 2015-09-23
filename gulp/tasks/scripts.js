// var gulp = require('gulp');
var plumber = require('gulp-plumber');
// var concat = require('gulp-concat');
var rename = require('gulp-rename');
// var uglify = require('gulp-uglify');
// var browserSync = require('browser-sync');


var gulp         = require('gulp');
var jshint       = require('gulp-jshint');
var stylish      = require('jshint-stylish');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var browserSync  = require('browser-sync');
// var handleErrors = require('../util/handleErrors.js');
var browserify   = require('browserify');
var watchify     = require('watchify');
var source       = require('vinyl-source-stream');
var buffer       = require('vinyl-buffer');

var src = ['./assets/js/scripts.js'];

var bundler = watchify(browserify(src, watchify.args));

bundler.on('update', bundle); // on any dep update, runs the bundler

function bundle() {
  return bundler.bundle()
    // .on('error', handleErrors)
    .pipe(source('scripts.min.js'))
    .pipe(gulp.dest('./assets/js/'))
    .pipe(buffer())
    // .pipe(uglify())
    .pipe(gulp.dest('./assets/js/'))
    .pipe(browserSync.reload({stream:true}));
}

var lintSrc = ['./assets/js/**/*.js', '!./assets/js/**/*.min.js', '!./assets/js/libs/**/*'];

gulp.task('lintJs', function () {
    return gulp.src(lintSrc)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
  });

gulp.task('scripts', ['lintJs'], bundle);

// gulp.task('scripts', function(){
//   return gulp.src('assets/js/**/*.js')
//     .pipe(plumber({
//       errorHandler: function (error) {
//         console.log(error.message);
//         this.emit('end');
//     }}))
//     .pipe(concat('scripts.js'))
//     // .pipe(gulp.dest('assets/js/'))
//     .pipe(rename({suffix: '.min'}))
//     .pipe(uglify())
//     .pipe(gulp.dest('assets/js/'))
//     .pipe(browserSync.reload({stream:true}))
// });
