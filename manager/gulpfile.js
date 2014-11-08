'use strict';

var
  gulp = require('gulp'),
  coffee = require('gulp-coffee'),
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
  templatesClientSideSrcPath = 'src/templates/client-side/',
  templatesServerSideSrcPath = 'src/templates/server-side/',

  paths = {
    stylesheetsBuildFolder: 'build/stylesheets/',  /* Stylesheets */
    stylusFiles: [
      stylesheetsSrcPath + 'constants/*.styl',

      stylesheetsSrcPath + 'general/*.styl',
      stylesheetsSrcPath + 'general/**/*.styl',

      stylesheetsSrcPath + '*.styl',
      stylesheetsSrcPath + '**/*.styl'
    ],

    scriptsLibBuildFolder: 'build/scripts/',  /* Scripts */
    scriptsLibFiles: [
      scriptLibSrcPath + 'angular/angular.min.js',
      scriptLibSrcPath + 'angular/*.js',

      scriptLibSrcPath + '*.js',
      scriptLibSrcPath + '**/*.js'
    ],

    scriptsAppBuildFolder: 'build/scripts/',
    scriptsAppFiles: [
      scriptAppSrcPath + 'init.coffee',

      scriptAppSrcPath + 'general/*.coffee',
      scriptAppSrcPath + 'general/**/*.coffee',

      scriptAppSrcPath + 'module.coffee',
      scriptAppSrcPath + '**/module.coffee',
      scriptAppSrcPath + '*.coffee',
      scriptAppSrcPath + '**/*.coffee'
    ],

    templatesBuildFolder: 'build/templates/',  /* Templates */
    templatesServerSideFiles: [
      'templates/server-side/*.jade',
      'templates/server-side/**/*.jade'
    ],
    templatesClientSideFiles: [
      'templates/client-side/*.jade',
      'templates/client-side/**/*.jade'
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

  .task('js-lib', function () {  /* Scripts lib */
    return gulp.src(paths.scriptsLibFiles)
      .pipe(plumber())
      .pipe(concat('lib.build.min.js'))
      .pipe(uglify({mangle: false}))
      .pipe(gulp.dest(paths.scriptsLibBuildFolder));
  })

  .task('js-app', function () {  /* Scripts app */
    return gulp.src(paths.scriptsAppFiles)
      .pipe(plumber())
      .pipe(concat('app.build.coffee'))
      .pipe(coffee())
      .pipe(gulp.dest(paths.scriptsAppBuildFolder))
      .pipe(uglify({mangle: false}))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(paths.scriptsAppBuildFolder));
  })

  .task('templates', function () {  /* Templates */
    gulp.src(paths.templatesClientSideFiles)
      .pipe(plumber())
      .pipe(templateCache({module: 'app', filename: 'client-side.build.js'}))
      .pipe(gulp.dest(paths.templatesBuildFolder));

    gulp.src(paths.templatesServerSideFiles)
      .pipe(gulp.dest(paths.templatesBuildFolder));
  });


gulp
  .task('browser-sync', function() {
    browserSync({
      proxy: 'localhost:1337',
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
