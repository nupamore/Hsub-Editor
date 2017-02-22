
const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const changed = require('gulp-changed')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const uglifyjs = require('gulp-uglifyjs')
const uglifycss = require('gulp-uglifycss')

const webpack = require('webpack-stream')
const webpackConfig = require('./webpack.config.js')

const del = require('del')


const src = {
  server: 'server.js',
  js: 'src/**/*.js',
  vue: 'src/**/*.vue',
  static: 'src/theme/*.*',
  build: 'dist',
}


// webpack
gulp.task('webpack', () => gulp
  .src([src.js, src.vue])
  .pipe(changed(src.build))
  .pipe(webpack(webpackConfig))
  .on('error', function error(e) {
    console.log(e.message)
    console.log(e.codeFrame)
    this.emit('end')
  })
  .pipe(gulp.dest(src.build)))


// lib
gulp.task('lib-js', () => gulp
  .src([
    'node_modules/vue/dist/vue.js',
    'node_modules/video.js/dist/video.js',
    'node_modules/videojs-youtube/dist/Youtube.js',
    'node_modules/libjass/libjass.js',
  ])
  .pipe(uglifyjs('lib.js'))
  .pipe(gulp.dest(`${src.build}/js`)))


// lib
gulp.task('lib-css', () => gulp
  .src([
    'node_modules/video.js/dist/video-js.css',
    'node_modules/libjass/libjass.css',
    'node_modules/videojs-ass/src/videojs.ass.css',
  ])
  .pipe(sourcemaps.init())
  .pipe(concat('lib.css'))
  .pipe(uglifycss())
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(`${src.build}/css`)))


// static copy
gulp.task('static', () => gulp
  .src(src.static)
  .pipe(changed(src.build))
  .pipe(gulp.dest(src.build)))


// watch
gulp.task('watch', () => {
  gulp.watch([src.js, src.vue], ['webpack'])
  gulp.watch(src.sass, ['sass'])
  gulp.watch(src.static, ['static'])
})


// clean all builded files
gulp.task('clean', () => del.sync([src.build, '.gulp-cache']))

// build
gulp.task('build', ['webpack', 'static', 'lib-js', 'lib-css'])

// server start
gulp.task('start', ['webpack', 'static', 'watch'], () => nodemon({
  script: src.server,
  watch: [src.server],
}))
