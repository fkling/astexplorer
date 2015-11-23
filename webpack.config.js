var webpack = require('webpack');
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
  },
  output: {
    path: './dist',
    publicPath: 'dist/',
    filename: '[name].js',
    chunkFilename: '[id].bundle.js',
  },
};
