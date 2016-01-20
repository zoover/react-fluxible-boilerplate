const gulp = require('gulp'); // used to run gulp
const eslint = require('gulp-eslint'); // used to lint all javascript using eslinter

const config = require('../config.js');

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