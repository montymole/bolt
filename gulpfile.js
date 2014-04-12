var path = require('path'),
  gulp = require('gulp'),
  changed = require('gulp-changed'),
  compass = require('gulp-compass'),
  minifycss = require('gulp-minify-css'),
  minifyhtml = require('gulp-minify-html'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  rename = require('gulp-rename'),
  clean = require('gulp-clean'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  cache = require('gulp-cache'),
  shell = require('gulp-shell'),

  bolttpl = require('gulp-bolt-tpl');

var app_js = [
  'src/js/medley.js',
  'src/js/tpls.js',
  'src/js/main.js'
];

gulp.task('js', function() {

  return gulp.src(app_js)
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('public/js'))
    .pipe(notify({
      message: 'Js task complete'
    }));

});

gulp.task('tpl', function() {

  gulp.src('src/tpl/*.tpl')
    .pipe(bolttpl('tpls.js'))
    .pipe(gulp.dest('src/js'))
    .pipe(notify({
      message: 'Medley task complete'
    }));

});

gulp.task('watch', function() {

  gulp.watch('src/js/*', ['js']);
  gulp.watch('src/tpl/*', ['tpl']);

});

gulp.task('default', ['tpl','js']);
