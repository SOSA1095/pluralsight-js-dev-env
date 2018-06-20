import path from 'path';
import webpack from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: {
    "vendor":path.resolve(__dirname, 'src/vendor'),
    "main":path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    //Generate an external css file with a hash in filenmae
    new ExtractTextPlugin('[name].[contenthash].css'),

    //Hash the files using m5 so that their names change when the content changes.
    new WebpackMd5Hash(),

    //Use CommonsChunksPlugin to create a seperate bundle
    //of vendor libreries so that they're cached separatlely.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),

    //Create HTML file that incluedes references to bundle JS.
    new HTMLWebpackPlugin({
      template: 'src/index.html',
      minify:{
        removeComments: true,
        collapseWhitespace:true,
        removeRedundantAttirbutes:true,
        useShortDoctype:true,
        removeEmptyAttributes:true,
        removeStyleLinkTypeAttributes:true,
        keepClosingSlash:true,
        minifyJS:true,
        minifyCSS:true,
        minifyURLs:true
      },
      inject:true
    }),

    //Eliminate duplicate package
    new webpack.optimize.DedupePlugin(),
    //Minify js
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders: ExtractTextPlugin.extract('css?sourceMap')}
    ]
  }
}
