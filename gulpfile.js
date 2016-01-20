const gulp = require('gulp');

require('./tasks/development.js');
require('./tasks/production.js');
require('./tasks/test.js');
require('./tasks/subtasks/cleanup.js');
require('./tasks/subtasks/assets.js');
require('./tasks/subtasks/scripts.js');
require('./tasks/subtasks/lint.js');

// Default tasks that are executed when you enter gulp in the command line.
gulp.task('default', ['dev-server']);
