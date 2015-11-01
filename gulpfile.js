var gulp = require('gulp')
  , changed = require('gulp-changed')
  , concat = require('gulp-concat')
  , gulpNgConfig = require('gulp-ng-config')

  // live reload
  , browserSync = require('browser-sync').create()
  , reload = browserSync.reload
  , historyApiFallback = require('connect-history-api-fallback')

  // sass
  , autoprefixer = require('gulp-autoprefixer')
  , sass = require('gulp-sass')
  , minifyCss = require('gulp-minify-css')

  // js
  , uglify = require('gulp-uglify')
  , flatten = require('gulp-flatten')

  // Path config
  , appName = '/fsr'
  , baseDir = './www'
  , outputDir = baseDir + appName
  , scssSrc = outputDir + '/main.scss'
  , jsSrc = ['/app.js', '/**/index.js','/**/*.js'].map(function(path){
      return outputDir +  path
    })
  , jsVendorSrc = './bower_components/**/*'
  , jsVendorDest = './www/lib'

  // App config
  , configModule = 'config'
  , config = './config.json'
  , configOutput = [outputDir, '/', configModule].join("")
  , ngConfigOptionsDev = new NgConfigOptions('dev')
  , ngConfigOptionsProd = new NgConfigOptions('prod')


/**
 * Class for configuring app enviorments.
 * @param {string} env -- the target enviorment
 * @constructor
 */
function NgConfigOptions(env){
  this.environment = env || 'dev'
  this.createModule = false
  this.wrap = ';(function () {\n"use-strict"\n\n<%= module %>})()'
}

gulp.task('browser-sync', function () {
  browserSync.init({
     server: {
       baseDir: baseDir
     , middleware: [ historyApiFallback() ]
     }
   })
})

gulp.task('sass', function () {
  return gulp.src(scssSrc)
    .pipe(changed(baseDir))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(sass()
      .on('error', function(err) { sass.logError(err) && this.emit('end')}))
    .pipe(minifyCss({ keepSpecialComments: 0 }))
    .pipe(gulp.dest(baseDir))
    .pipe(browserSync.stream())
})

gulp.task('config:dev', function () {
  return gulp.src(config)
    .pipe(gulpNgConfig(configModule, ngConfigOptionsDev))
    .pipe(gulp.dest(configOutput))
    .pipe(browserSync.stream())
})


gulp.task('config:prod', function () {
  return gulp.src(config)
    .pipe(gulpNgConfig(configModule,  ngConfigOptionsProd))
    .pipe(gulp.dest(configOutput))
    .pipe(browserSync.stream())
})


/**
 * Concatenates, minifies, and outputs site's javascript.
 * @return {stream}
 */
function buildJs() {
  return gulp.src(jsSrc)
    .pipe(changed(baseDir))
    .pipe(uglify().on('error', console.error.bind(console)))
    .pipe(concat('main.min.js'))
    .pipe(flatten())
    .pipe(gulp.dest(baseDir))
    .pipe(browserSync.stream())
}

/**
 * Copy site's vendor scripts from bower_components to project lib.
 * @return {stream}
 */
function buildVendorJs() {
  return gulp.src(jsVendorSrc)
    .pipe(changed(jsVendorDest))
    .pipe(gulp.dest(jsVendorDest))
    .pipe(browserSync.stream())
}

gulp.task('build:js:vendor', buildVendorJs)
gulp.task('build:js:dev', ['config:dev', 'build:js:vendor'], buildJs)
gulp.task('build:js:prod', ['config:prod', 'build:js:vendor'], buildJs)

gulp.task('build:dev', ['build:js:dev', 'sass'])
gulp.task('build:prod', ['build:js:prod', 'sass'])

gulp.task('default', ['build:js:dev', 'sass', 'browser-sync'], function(){
  gulp.watch(['./**/*.scss'], ['sass'])
  gulp.watch([jsSrc], ['build:js:dev'])
  gulp.watch(['./**/*.html'], [reload])
})
