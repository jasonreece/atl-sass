var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');

// var sassOptions =  {
//   outputStyle: 'compressed'
// };

gulp.task('styles', function(){
  gulp.src(['assets/stylesheets/**/*.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    // .pipe(sass(sassOptions))
    .pipe(sass())
    // .pipe(autoprefixer('last 2 versions'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('assets/stylesheets/'));
});
