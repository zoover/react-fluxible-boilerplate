const gulp = require('gulp');
const del = require('del');

// Task for cleaning up the build folder. Thus we make sure the build folder is
// emtpy before we build the project.
gulp.task('cleanup', function () {
  return del([
    'build/*',
  ]);
});
