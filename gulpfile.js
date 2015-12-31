const gulp = require('gulp'); // used to run gulp
const eslint = require('gulp-eslint'); // used to lint all javascript using eslinter
const del = require('del'); // used to create gulp tasks that delete files
const runSequence = require('run-sequence'); // used to make sure certain tasks run in sequence, rather than parralel

const config = require('./tasks/config.js');
require('./tasks/development.js');
require('./tasks/production.js');
require('./tasks/test.js');

// Task for cleaning up the build folder. Thus we make sure the build folder is
// emtpy before we build the project.
gulp.task('cleanup', function() {
  return del([
    'build/*',
  ]);
});

// Task for linting all our javascript inside our application.
gulp.task('lint', function() {
  return gulp.src(config.paths.scripts_src)
    .pipe(eslint())
    .pipe(eslint.format());
});

// Task for fixing all linting errors which can be auto-fixed.
gulp.task('lint:fix', function() {
  return gulp.src(config.paths.scripts_src, {base: '.'})
    .pipe(eslint({fix: true}))
    .pipe(gulp.dest('.'))
    .pipe(eslint.format());
});


// Default tasks that are executed when you enter gulp in the command line.
gulp.task('default', function(callback) {
  runSequence('dev:build', 'lint', 'dev:server', 'dev:watch', callback);
});
