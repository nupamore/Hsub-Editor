
const webpack = require('webpack')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const path = require('path')

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, 'src'),
  entry: {
    core: './core',
  },
  output: {
    filename: path.resolve(__dirname, 'js/editor.js'),
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
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
