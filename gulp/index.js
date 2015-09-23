var tasks = [
  'browser-sync',
  'browser-sync-reload',
  'default',
  'images',
  'jekyll-build',
  'jekyll-rebuild',
  'scripts',
  'styles',
  'hologram',
  'watch'
];

tasks.forEach(function(task) {
  exports.task = require('./tasks/' + task + '.js');
});
