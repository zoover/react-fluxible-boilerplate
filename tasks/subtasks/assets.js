const gulp = require('gulp'); // used to run gulp
const sass = require('gulp-sass'); // used to compile scss files to css
const sassGlob = require('gulp-sass-glob'); // add glob capability to sass compiler
const autoprefixer = require('gulp-autoprefixer'); // used to parse css files and add vendor prefixes based on the last versions of all the browsers
const del = require('del'); // used to create gulp tasks that delete files
const fs = require('fs');
const realFavicon = require('gulp-real-favicon');
const change = require('gulp-change');
const cssnano = require('gulp-cssnano');
const gzip = require('gulp-gzip');
const json = require('jsonfile');
const path = require('path');

const config = require('../config.js');

// Task for processing static content such as images and fonts. Will just copy
// the files from source to destination.
gulp.task('assets:images-and-fonts', function() {
  gulp.src(config.paths.fonts_src)
    .pipe(gulp.dest(config.paths.build_dest));
  gulp.src(config.paths.images_src)
    .pipe(gulp.dest(config.paths.build_dest));
});

// Task for processing sass files. Uses gulp-sass to create a single css file
// in the destination folder. Autoprefixer will automatically write prefixes on
// css for last 2 versions.
gulp.task('assets:styles-production', function() {
  return gulp.src(config.paths.main_style_src)
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(cssnano())
    .pipe(gzip())
    .pipe(gulp.dest(config.paths.build_dest));
});

gulp.task('assets:styles', function() {
  return gulp.src(config.paths.main_style_src)
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest(config.paths.build_dest));
});

// Generate favicons via realfavicongenerator.com API
function processFavicon(assetsBasePath, done) {
  realFavicon.generateFavicon({
    masterPicture: config.paths.favicon_src,
    dest: config.paths.build_dest,
    iconsPath: assetsBasePath,
    design: config.favicon,
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
}

gulp.task('assets:favicon', function(done) {
  const assetsBasePath = '/assets';
  processFavicon(assetsBasePath, done);
});

gulp.task('assets:favicon-production', function(done) {
  const productionSettings = json.readFileSync(config.paths.production_config_file);
  const assetsBasePath = productionSettings.assets_base_url + productionSettings.assets_version + '/';
  processFavicon(assetsBasePath, done);
});
