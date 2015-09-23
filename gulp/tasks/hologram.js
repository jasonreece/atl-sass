var gulp = require('gulp');
var hologram = require('gulp-hologram');
var browserSync = require('browser-sync');

gulp.task('hologram', function () {
  gulp.src('./style-guide/hologram_config.yml')
  .pipe(hologram({logging:true}));
});
