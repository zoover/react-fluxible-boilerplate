const gulp = require('gulp');

const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');

const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const merge = require('utils-merge');

const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');

const gzip = require('gulp-gzip');

/* nicer browserify errors */
const gutil = require('gulp-util');
const chalk = require('chalk');

const config = require('../config.js');

function mapError(err) {
  if (err.fileName) {
    // regular error
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.fileName.replace(__dirname + '/src/js/', ''))
      + ': '
      + 'Line '
      + chalk.magenta(err.lineNumber)
      + ' & '
      + 'Column '
      + chalk.magenta(err.columnNumber || err.column)
      + ': '
      + chalk.blue(err.description));
  } else {
    // browserify error..
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.message));
  }
}

function bundleJs(bundler) {
  return bundler.bundle()
    .on('error', mapError)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest(config.paths.build_dest))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('.'));
}

gulp.task('scripts:watchify', function () {
  const args = merge(watchify.args, { debug: true });
  const bundler = watchify(browserify(config.paths.main_script_src, args)).transform(babelify);
  bundleJs(bundler);

  bundler.on('update', function () {
    bundleJs(bundler);
  });

  bundler.on('time', function (time) {
    gutil.log(`Watchify: scripts bundled in ${chalk.cyan(time / 1000)} seconds`);
  });
});


// Without watchify
gulp.task('scripts:browserify', function () {
  const bundler = browserify(config.paths.main_script_src, { debug: true }).transform(babelify);
  return bundleJs(bundler);
});

// Without sourcemaps
gulp.task('scripts:browserify-production', function () {
  const bundler = browserify(config.paths.main_script_src).transform(babelify);

  return bundler.bundle()
    .on('error', mapError)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(rename('bundle.min.js'))
    .pipe(uglify())
    .pipe(gzip())
    .pipe(gulp.dest(config.paths.build_dest));
});
