const webpack = require('webpack');
const DependencyResolvePlugin = require('./DependencyResolverPlugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.txt$/,
        exclude: /node_modules/,
        loader: 'raw-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            'babel-preset-es2015',
            'babel-preset-react',
          ],
          plugins: [
            [
              'babel-plugin-transform-object-rest-spread',
              {'use-builtin': true},
            ],
            'babel-plugin-transform-regenerator',
          ],
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new (require('wrapper-webpack-plugin'))({
      header: '(function(define) {',
      footer: '}(astexplorerDefine));',
    }),
    //new webpack.optimize.UglifyJsPlugin(),
  ],
  resolve: {
    plugins: [
      DependencyResolvePlugin,
    ],
  },
  node: {
    child_process: 'empty',
    fs: 'empty',
    module: 'empty',
    net: 'empty',
    readline: 'empty',
  },
  externals: {
    'react': 'react',
  },
};
