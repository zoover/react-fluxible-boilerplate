const gulp = require('gulp'); // used to run gulp
const runSequence = require('run-sequence'); // used to make sure certain tasks run in sequence, rather than parralel
const gls = require('gulp-live-server');
const moment = require('moment');
const json = require('jsonfile');

const config = require('./config.js');

// Serve, watch and reload
gulp.task('production:server', function() {
  // Start the server at the beginning of the task
  const server = gls('run.js', {env: {NODE_ENV: 'production'}}, false);
  server.start();
});

// Task that will build the app. runSequence is used to make sure the build folder is
// cleaned first. When cleanup is done, all the other tasks will be executed parallel.
gulp.task('production:build', function(callback) {
  const version = moment().format('YYYYMMDDHHmmss');
  config.paths.build_dest += version + '/';

  const productionSettings = json.readFileSync(config.paths.production_config_file);
  productionSettings.assets_version = version;
  json.writeFileSync(config.paths.production_config_file, productionSettings, {spaces: 2});

  runSequence(
    'cleanup',
    ['assets:favicon-production', 'assets:images-and-fonts', 'assets:styles-production', 'scripts:browserify-production'],
    callback
   );
});

