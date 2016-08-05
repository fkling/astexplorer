var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');

const DEV = process.env.NODE_ENV !== 'production';

var plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV':
      JSON.stringify(process.env.NODE_ENV || 'development'),
  }),
  new webpack.optimize.CommonsChunkPlugin({
    async: true,
    minChunks: 3,
  }),
  new webpack.IgnorePlugin(
    /\.md$/
  ),
  new webpack.IgnorePlugin(
    /node\/nodeLoader.js/,
    /traceur/
  ),
  // Usually babel-eslint tries to patch eslint, but we are using "parseNoPatch",
  // so that code patch will never be executed. However, webpack will still bundle
  // eslint. Since eslint@3 is a dev dependency it will pick up that one which
  // is incorrect.
  new webpack.IgnorePlugin(
    /eslint/,
    /babel-eslint/
  ),
  // Shim ESLint stuff that's only relevant for Node.js
  new webpack.NormalModuleReplacementPlugin(
    /(cli-engine|testers\/rule-tester)/,
    'node-libs-browser/mock/empty'
  ),
  new webpack.NormalModuleReplacementPlugin(
    /load-rules/,
    __dirname + '/src/parsers/js/transformers/eslint1/loadRulesShim.js'
  ),
  // Hack to disable Webpack dynamic requires in ESLint, so we don't end up
  // bundling the entire ESLint directory including files we don't even need.
  // https://github.com/webpack/webpack/issues/198
  new webpack.ContextReplacementPlugin(/eslint/, /NEVER_MATCH^/),
  new ExtractTextPlugin(DEV ? '[name].css' : '[name]-[chunkhash].css'),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: DEV ? 'vendor.js' : 'vendor-[chunkhash].js',
    minChunks: Infinity,
  }),
  new ChunkManifestPlugin({
    filename: 'manifest.json',
  }),
  new HtmlWebpackPlugin({
    templateContent: function(templateParams, compilation) {
      const manifest = compilation.assets['manifest.json'];
      templateParams.manifest = manifest ?
        manifest._value :
        fs.readFileSync(
          compilation.outputOptions.path + '/manifest.json',
          'utf-8'
        );

      return fs.readFileSync('./index.html', 'utf-8');
    },
    favicon: './favicon.png',
    inject: 'body',
  }),
  new webpack.NamedModulesPlugin(),
];


if (!DEV) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        except: ['Plugin', 'Tree', 'JSON'],
      },
      compress: {
        warnings: false,
        keep_fnames: true, // eslint-disable-line camelcase
      },
    })
  );
}

module.exports = Object.assign({
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
        exclude: [
          /node_modules(?!(\/jscodeshift\/dist))/,
          path.join(__dirname, './packages/'),
        ],
        loader: 'babel',
        query: {
          babelrc: false,
          presets: [
            require.resolve('babel-preset-es2015'),
            require.resolve('babel-preset-stage-1'),
            require.resolve('babel-preset-react'),
          ],
          plugins: [
            require.resolve('babel-plugin-transform-runtime'),
          ],
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?importLoaders=1!autoprefixer-loader'),
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
    ],

    noParse: [
      /traceur\/bin/,
      /typescript\/lib/,
      /acorn\/dist\/acorn\.js/,
    ],
  },

  node: {
    child_process: 'empty',
    fs: 'empty',
    module: 'empty',
    net: 'empty',
    readline: 'empty',
  },
  resolve: {
    fs: 'fs',
  },

  plugins: plugins,

  entry: {
    vendor: [
      'classnames',
      'codemirror',
      'halting-problem',
      'json-stringify-safe',
      'keypress',
      'parse',
      'pubsub-js',
      'react',
    ],
    app: './src/app.js',
    style: './css/style.css',
  },

  output: {
    path: './out',
    filename: DEV ? '[name].js' : '[name]-[chunkhash].js',
    chunkFilename: DEV ? '[name].js' : '[name]-[chunkhash].js',
  },
},

DEV ?
  {} :
  {recordsPath: path.join(__dirname, 'records.json')}
);
