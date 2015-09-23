var gulp = require('gulp');

gulp.task('watch', function() {
    // scripts
    gulp.watch('./assets/js/**/*.js', ['scripts', 'jekyll-rebuild.js']);

    // styles
    gulp.watch('./assets/stylesheets/**/*.scss', ['styles', 'hologram', 'jekyll-rebuild']);

    // living style guide
    gulp.watch('./style-guide/doc_assets/**', [ 'hologram', 'jekyll-rebuild']);

    // markup
    gulp.watch(['./**/*.html', './**/*.md', '!./.git/**', '!./_site/**', '!./assets/**', '!./gulp/**','!./node_modules/**'], ['jekyll-rebuild']);
});

