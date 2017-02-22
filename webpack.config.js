
const webpack = require('webpack')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const path = require('path')
const fs = require('fs')


// Generate entry from theme folders
const entry = fs.readdirSync('src/theme')
  .filter(theme => !theme.match(/\./))
  .reduce((obj, theme) => {
    obj[theme] = `./theme/${theme}/${theme}.js`
    return obj
  }, {})


module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, 'src'),
  entry,
  output: {
    filename: path.resolve(__dirname, 'js/[name].js'),
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        rules: {
          cacheDirectory: true,
          plugins: ['lodash'],
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue',
      },
      {
        test: /\.less$/,
        loader: 'style!css!less',
      },
    ],
  },
  plugins: [
    new LodashModuleReplacementPlugin(),
    /*
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      minimize: true,
      sourceMap: true,
    }),
    */
  ],
}
