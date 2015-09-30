var tasks = [
  'browser-sync',
  'default',
  'images',
  'jekyll-build',
  'jekyll-rebuild',
  'styles',
  'hologram',
  'watch'
];

tasks.forEach(function(task) {
  exports.task = require('./tasks/' + task + '.js');
});
