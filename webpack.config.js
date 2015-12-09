var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV':
      JSON.stringify(process.env.NODE_ENV || 'development'),
  }),
  new webpack.optimize.CommonsChunkPlugin({
    children: true,
    async: true,
    minChunks: 2,
  }),
  new webpack.IgnorePlugin(
    /\.md$/
  ),
  new webpack.IgnorePlugin(
    /node\/nodeLoader.js/,
    /traceur/
  ),
  new HtmlWebpackPlugin({
    template: './index.html',
    favicon: './favicon.png',
    inject: 'body',
    hash: true,
  }),
  new ExtractTextPlugin("[name].css")
];


if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    mangle: false, // Otherwise babelv5 plugins don't work
    compress: {
      keep_fnames: true, // eslint-disable-line camelcase
    },
  }));
}

module.exports = {
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.txt$/,
        exclude: /node_modules/,
        loader: 'raw',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel?cacheDirectory&optional[]=runtime&stage=0',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader?importLoaders=1!autoprefixer-loader"),
      },
      {
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: "url-loader?limit=10000&mimetype=application/font-woff"
			},
      {
				test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: "file-loader"
			}
    ],

    noParse: [
      /traceur\/bin/,
      /typescript\/lib/,
      /acorn\/dist/,
    ],
  },

  node: {
    fs: 'empty',
    module: 'empty',
    net: 'empty',
  },

  plugins: plugins,

  entry: {
    app: './src/app.js',
		style: './css/style.css',
  },

  output: {
    path: './out',
    //publicPath: '',
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].bundle.js',
  },
};
