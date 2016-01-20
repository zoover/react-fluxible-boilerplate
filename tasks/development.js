const gulp = require('gulp'); // used to run gulp
const runSequence = require('run-sequence'); // used to make sure certain tasks run in sequence, rather than parralel
const gls = require('gulp-live-server');
const portInService = require('port-in-service');
const eslint = require('gulp-eslint'); // used to lint all javascript using eslinter

const config = require('./config.js');

// Serve, watch and reload
gulp.task('dev-server', function(callback) {
  runSequence('cleanup', ['assets:favicon', 'assets:images-and-fonts', 'assets:styles', 'scripts:watchify'], () => {
    // Start the server at the beginning of the task
    const server = gls('run.js', {env: {NODE_ENV: 'development'}}, config.live_reload_port);
    server.start();

    gulp.watch(['build/**/*'], function(file) {
      console.log('Dev server: file', file.path.split(/[\\/]/).pop(), 'changed, restarting ...');
      // Restart Express server
      server.start.bind(server)();

      // Check availability of port 3000, to determine if server is up
      function checkServerUp() {
        portInService(3000, function(up) {
          if (up) {
            console.log('Dev server: restarted, notifying listeners');
            server.notify.apply(server, [file]);
          } else {
            setTimeout(checkServerUp, 100);
          }
        });
      }
      setTimeout(checkServerUp, 100);
    });
    gulp.watch([config.paths.images_src, config.paths.fonts_src], ['assets:images-and-fonts']);
    gulp.watch(config.paths.styles_src, ['assets:styles']);
    gulp.watch(config.paths.scripts_src, function(file) {
      return gulp.src(file.path)
        .pipe(eslint())
        .pipe(eslint.format());
    });
    gulp.watch(config.paths.favicon_src, ['assets:favicon']);
    callback();
  });
});
