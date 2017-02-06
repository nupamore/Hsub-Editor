
const gulp = require('gulp')
const sass = require('gulp-sass')
const nodemon = require('gulp-nodemon')
const changed = require('gulp-changed')
const sourcemaps = require('gulp-sourcemaps')
const webpack = require('webpack-stream')
const webpackConfig = require('./webpack.config.js')
const del = require('del')


const src = {
  index: 'server.js',
  js: 'src/**/*.js',
  vue: 'src/**/*.vue',
  sass: 'src/theme/**/*.scss',
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

// sass compile
gulp.task('sass', () => gulp
  .src(src.sass)
  .pipe(changed(src.build))
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(src.build)))

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

// clean all build files
gulp.task('clean', () => del.sync([src.build, '.gulp-cache']))


// build
gulp.task('build', ['webpack', 'sass', 'static'])

// server start
gulp.task('start', ['build', 'watch'], () => nodemon({
  script: src.index,
  watch: [src.index],
}))
