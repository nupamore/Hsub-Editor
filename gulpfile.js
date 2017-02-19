
const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const changed = require('gulp-changed')
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
gulp.task('build', ['webpack', 'static'])

// server start
gulp.task('start', ['build', 'watch'], () => nodemon({
  script: src.server,
  watch: [src.server],
}))
