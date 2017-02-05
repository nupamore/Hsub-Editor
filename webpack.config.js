
const webpack = require('webpack')

module.exports = {
  devtool: 'source-map',
  context: `${__dirname}/src`,
  entry: {
    core: './core',
  },
  output: {
    filename: `${__dirname}/js/editor.js`,
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        cacheDirectory: true,
      },
    }],
  },
  plugins: [new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
    minimize: true,
    sourceMap: true,
  })],
}
