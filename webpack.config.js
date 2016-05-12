var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {

  entry: {
    'react-menu': './src/index.js',
    'react-menu.min': './src/index.js'
  },

  externals: [
    'react',
    'react-dom'
  ],

  output: {
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    path: 'dist',
    publicPath: '/',
    libraryTarget: 'umd',
    library: 'ReactMenu'
  },

  plugins: [
    new UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
      }
    ]
  },

};
