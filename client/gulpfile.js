'use strict';

var
  gulp = require('gulp'),
  stylus = require('gulp-stylus'),
  jade = require('gulp-jade'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  minifyCSS = require('gulp-minify-css'),
  templateCache = require('gulp-angular-templatecache'),
  cssBase64 = require('gulp-css-base64'),
  rename = require('gulp-rename'),
  browserSync = require('browser-sync'),
  plumber = require('gulp-plumber');

var
  reload = browserSync.reload;

var
  stylesheetsSrcPath = 'src/stylesheets/',
  scriptLibSrcPath = 'src/scripts/lib/',
  scriptAppSrcPath = 'src/scripts/app/',

  paths = {
    stylesheetsBuildFolder: 'build/stylesheets/',  /* Stylesheets */
    stylusFiles: [
      stylesheetsSrcPath + 'constants/*.styl',

      stylesheetsSrcPath + 'general/*.styl',
      stylesheetsSrcPath + 'general/**/*.styl',

      stylesheetsSrcPath + '*.styl',
      stylesheetsSrcPath + '**/*.styl'
    ],

    scriptsLibBuildFolder: 'scripts/',  /* Scripts */
    scriptsLibFiles: [
      scriptLibSrcPath + 'angular/angular.min.js',
      scriptLibSrcPath + 'angular/*.js',

      scriptLibSrcPath + '*.js',
      scriptLibSrcPath + '**/*.js'
    ],
    scriptsAppFolder: 'scripts/app/',
    scriptsAppFiles: [
      'scripts/app/init.js',

      'scripts/app/general/*.js',
      'scripts/app/general/**/*.js',

      'scripts/app/module.js',
      'scripts/app/**/module.js',
      'scripts/app/*.js',
      'scripts/app/**/*.js',

      '!scripts/lib/*'
    ],

    templatesFolder: 'templates/',  /* Templates */
    templatesFiles: [
      'templates/client-side/*.html',
      'templates/client-side/**/*.html'
    ]
  };


gulp
  .task('stylus', function () {  /* Stylesheets */
    return gulp.src(paths.stylusFiles)
      .pipe(plumber())
      .pipe(concat('stylus.build.styl'))
      .pipe(stylus({pretty: true}))
      .pipe(cssBase64({maxWeightResource: 1000000}))
      .pipe(gulp.dest(paths.stylesheetsBuildFolder))
      .pipe(minifyCSS())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(paths.stylesheetsBuildFolder));
  })

  .task('templates', function () {  /* Templates */
    return gulp.src(paths.templatesFiles)
      .pipe(plumber())
      .pipe(templateCache({module: 'app', filename: 'client-side.build.js'}))
      .pipe(gulp.dest(paths.templatesFolder));
  })

  .task('js-lib', function () {  /* Scripts lib */
    return gulp.src(paths.scriptsLibFiles)
      .pipe(plumber())
      .pipe(concat('lib.build.min.js'))
      .pipe(gulp.dest(paths.scriptsFolder));
  })

  .task('js-app', function () {  /* Scripts app */
    return gulp.src(paths.scriptsAppFiles)
      .pipe(plumber())
      .pipe(concat('app.build.js'))
      .pipe(gulp.dest(paths.scriptsFolder))
      .pipe(uglify({mangle: false}))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(paths.scriptsFolder));
  });


gulp
  .task('browser-sync', function() {
    browserSync({
      proxy: '192.168.1.250:1337',
      host: '192.168.1.250',
      port: '3001',
      open: false
    });
  });


gulp
  .task('build', function () {  /* Build */
    gulp.start('stylus');
    gulp.start('templates');
    gulp.start('js-lib');
    gulp.start('js-app');
  })

  .task('watch', ['browser-sync'], function() {  /* Watch */
    gulp.watch(paths.stylusFiles, ['stylus', browserSync.reload]);
    gulp.watch(paths.templatesFiles, ['templates', browserSync.reload]);
    gulp.watch(paths.scriptsAppFiles, ['js-app', browserSync.reload]);
  })

  .task('default', ['build', 'watch']);  /* Default */
