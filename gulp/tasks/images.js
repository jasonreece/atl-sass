var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

gulp.task('images', function(){
  gulp.src('assets/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('assets/img/'));
});
