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
    stylesheetsFiles: [
      stylesheetsSrcPath + 'mixins/*.styl',
      stylesheetsSrcPath + 'mixins/**/*.styl',

      stylesheetsSrcPath + 'elements/*.styl',
      stylesheetsSrcPath + 'elements/**/*.styl',

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
      templatesServerSideSrcPath + '*.jade',
      templatesServerSideSrcPath + '**/*.jade'
    ],
    templatesClientSideFiles: [
      templatesClientSideSrcPath + '*.jade',
      templatesClientSideSrcPath + '**/*.jade'
    ]
  };


gulp
  .task('stylesheets', function () {  /* Stylesheets */
    return gulp.src(paths.stylesheetsFiles)
      .pipe(plumber())
      .pipe(concat('app.build.styl'))
      .pipe(stylus({pretty: true}))
      .pipe(cssBase64({maxWeightResource: 1000000}))
      .pipe(gulp.dest(paths.stylesheetsBuildFolder))
      .pipe(minifyCSS())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(paths.stylesheetsBuildFolder));
  })

  .task('scripts-lib', function () {  /* Scripts lib */
    return gulp.src(paths.scriptsLibFiles)
      .pipe(plumber())
      .pipe(concat('lib.build.min.js'))
      //.pipe(uglify({mangle: false}))
      .pipe(gulp.dest(paths.scriptsLibBuildFolder));
  })

  .task('scripts-app', function () {  /* Scripts app */
    return gulp.src(paths.scriptsAppFiles)
      .pipe(plumber())
      .pipe(concat('app.build.coffee'))
      .pipe(coffee())
      .pipe(gulp.dest(paths.scriptsAppBuildFolder))
      .pipe(uglify({mangle: false}))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(paths.scriptsAppBuildFolder));
  })

  .task('templates-client', function () {  /* Templates */
    return gulp.src(paths.templatesClientSideFiles)
      .pipe(plumber())
      .pipe(jade())
      .pipe(templateCache({module: 'app', filename: 'client-side.build.js'}))
      .pipe(gulp.dest(paths.templatesBuildFolder));
  })

  .task('templates-server', function () {
    return gulp.src(paths.templatesServerSideFiles)
      .pipe(jade())
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
    gulp.start('templates-server');
    gulp.start('templates-client');
    gulp.start('stylesheets');
    gulp.start('scripts-lib');
    gulp.start('scripts-app');
  })

  .task('watch', function() {  /* Watch */
    gulp.watch(paths.templatesServerSideFiles, ['templates-server']);
    gulp.watch(paths.templatesClientSideFiles, ['templates-client']);
    gulp.watch(paths.stylesheetsFiles, ['stylesheets']);
    gulp.watch(paths.scriptsAppFiles, ['scripts-app']);
    gulp.watch(paths.scriptsLibFiles, ['scripts-lib']);
  })

  .task('sync', ['browser-sync'], function() {  /* Watch */
    gulp.watch(paths.templatesServerSideFiles, ['templates-server', browserSync.reload]);
    gulp.watch(paths.templatesClientSideFiles, ['templates-client', browserSync.reload]);
    gulp.watch(paths.stylesheetsFiles, ['stylesheets', browserSync.reload]);
    gulp.watch(paths.scriptsAppFiles, ['scripts-app', browserSync.reload]);
    gulp.watch(paths.scriptsLibFiles, ['scripts-lib', browserSync.reload]);
  })

  .task('default', ['build', 'sync']);  /* Default */
