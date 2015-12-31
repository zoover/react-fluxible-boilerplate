const gulp = require('gulp'); // used to run gulp
const sass = require('gulp-sass'); // used to compile scss files to css
const sassGlob = require('gulp-sass-glob'); // add glob capability to sass compiler
const browserify = require('browserify');
const streamify = require('gulp-streamify');
const source = require('vinyl-source-stream');
const autoprefixer = require('gulp-autoprefixer'); // used to parse css files and add vendor prefixes based on the last versions of all the browsers
const uglify = require('gulp-uglify');
const minifyCss = require('gulp-minify-css');
const del = require('del'); // used to create gulp tasks that delete files
const runSequence = require('run-sequence'); // used to make sure certain tasks run in sequence, rather than parralel
const gls = require('gulp-live-server');
const fs = require('fs');
const realFavicon = require('gulp-real-favicon');
const path = require('path');
const change = require('gulp-change');
const moment = require('moment');
const json = require('jsonfile');
const gzip = require('gulp-gzip');

const config = require('./config.js');

// Task for processing sass files. Uses gulp-sass to create a single css file
// in the destination folder. Autoprefixer will automatically write prefixes on
// css for last 2 versions.
gulp.task('production:process-styles', function() {
  return gulp.src(config.paths.main_style_src)
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(minifyCss())
    .pipe(gzip())
    .pipe(gulp.dest(config.paths.build_dest));
});

// Task for processing js files. Uses webpack to convert js files to ES6 and to concatenate them.
gulp.task('production:process-scripts', function() {
  browserify(config.paths.main_script_src)
    .transform('babelify', {presets: ['es2015', 'react']})
    .bundle()
    .on('error', function(err) {
      console.error('JS error: ' + err.message);
    })
    .pipe(source('bundle.js'))
    .pipe(streamify(uglify()))
    .pipe(gzip())
    .pipe(gulp.dest(config.paths.build_dest));
});

// Task for processing static content such as images and fonts. Will just copy
// the files from source to destination.
gulp.task('production:process-images-and-fonts', function() {
  gulp.src(config.paths.fonts_src)
    .pipe(gulp.dest(config.paths.build_dest));
  gulp.src(config.paths.images_src)
    .pipe(gulp.dest(config.paths.build_dest));
});

// Generate favicons via realfavicongenerator.com API
gulp.task('production:process-favicon', function(done) {
  const productionSettings = json.readFileSync(config.paths.production_config_file);
  const assetsBasePath = productionSettings.assets_base_url + productionSettings.assets_version + '/';
  realFavicon.generateFavicon({
    masterPicture: config.paths.favicon_src,
    dest: config.paths.build_dest,
    iconsPath: assetsBasePath,
    design: {
      ios: {
        pictureAspect: 'backgroundAndMargin',
        backgroundColor: '#ffffff',
        margin: '21%'
      },
      desktopBrowser: {},
      windows: {
        pictureAspect: 'whiteSilhouette',
        backgroundColor: '#da532c',
        onConflict: 'override'
      },
      androidChrome: {
        pictureAspect: 'noChange',
        themeColor: '#ffffff',
        manifest: {
          name: config.app_name,
          display: 'browser',
          orientation: 'notSet',
          onConflict: 'override'
        }
      },
      safariPinnedTab: {
        pictureAspect: 'silhouette',
        themeColor: '#5bbad5'
      }
    },
    settings: {
      scalingAlgorithm: 'Mitchell',
      errorOnImageTooSmall: false
    },
    markupFile: config.paths.favicon_data,
  }, function() {
    // Replace existing {fav} block content with newly created tags
    const replaced = '{/* fav */}\n' + JSON.parse(fs.readFileSync(config.paths.favicon_data)).favicon.html_code.replace(/>/g, ' />') + '\n{/* /fav */}';
    gulp.src(config.paths.layout_file)
    .pipe(change(function(content) {
      const changed = content.replace(/{\/\* fav \*\/}(.|\n)*{\/\* \/fav \*\/}/, replaced);
      return changed;
    }))
    .pipe(gulp.dest(path.dirname(config.paths.layout_file)));

    // Cleanup favicon data file
    del(config.paths.favicon_data);
    done();
  });
});

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
    ['production:process-favicon', 'production:process-images-and-fonts', 'production:process-styles', 'production:process-scripts'],
    callback
   );
});

