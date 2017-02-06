const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const DEV = process.env.NODE_ENV !== 'production';

const packages = fs.readdirSync(path.join(__dirname, 'packages'));
const vendorRegex = new RegExp(`/node_modules/(?!${packages.join('|')}/)`);

const plugins = [
  new WebpackChunkHash(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV':
      JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.API_HOST': JSON.stringify(process.env.API_HOST || ''),
  }),
  new webpack.IgnorePlugin(
    /\.md$/,
    /node\/nodeLoader.js/,
    /traceur/,
  // Usually babel-eslint tries to patch eslint, but we are using "parseNoPatch",
  // so that code patch will never be executed. However, webpack will still bundle
  // eslint. Since eslint@3 is a dev dependency it will pick up that one which
  // is incorrect.
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

  // There seems to be a problem with webpack loading an index.js file that
  // is executable. If we change that to explicitly reference index.js, it seems
  // to work. The problem is in the csstree module and this is a really hacky
  // solution.
  new webpack.NormalModuleReplacementPlugin(
    /\.\.\/data/,
    module => {
      if (/css-tree/.test(module.context)) {
        module.request += '/index.js';
      }
    }
  ),

  // Hack to disable Webpack dynamic requires in ESLint, so we don't end up
  // bundling the entire ESLint directory including files we don't even need.
  // https://github.com/webpack/webpack/issues/198
  new webpack.ContextReplacementPlugin(/eslint/, /NEVER_MATCH^/),

  new ExtractTextPlugin({
    filename: DEV ? '[name].css' : '[name]-[chunkhash].css',
    allChunks: true,
  }),

  // Put parser meta data into its own chunk
  new webpack.optimize.CommonsChunkPlugin({
    name: 'parsermeta',
    minChunks: module => module.resource && /\/package\.json$/.test(module.resource),
    chunks: ['app'],
  }),

  // Put all vendor code into its own chunk
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: module => module.resource && vendorRegex.test(module.resource),
    chunks: ['app'],
  }),

  // Webpack runtime + manifest
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    minChunks: Infinity,
  }),

  new HtmlWebpackPlugin({
    favicon: './favicon.png',
    inject: 'body',
    filename: 'index.html',
    template: './index.ejs',
    chunksSortMode: 'id',
  }),

  // Inline runtime and manifest into the HTML. It's small and changes after every build.
  new InlineManifestWebpackPlugin({
    name: 'webpackManifest',
  }),
  DEV ?
    new webpack.NamedModulesPlugin() :
    new webpack.HashedModuleIdsPlugin(),
  new ProgressBarPlugin(),
  new webpack.LoaderOptionsPlugin({
    test: /\.jsx?$/,
    options: {
      'uglify-loader': {
        mangle: {
          except: ['Plugin', 'Tree', 'JSON'],
        },
        compress: {
          warnings: false,
        },
      },
    },
  }),
];

module.exports = Object.assign({
  module: {
    rules: [
      {
        test: /\.txt$/,
        exclude: /node_modules/,
        loader: 'raw-loader',
      },
      {
        test: /\.jsx?$/,
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'node_modules', 'redux', 'es'),
          path.join(__dirname, 'node_modules', 'react-redux', 'es'),
          path.join(__dirname, 'node_modules', 'eslint', 'lib'),
          path.join(__dirname, 'node_modules', 'jscodeshift', 'dist'),
          path.join(__dirname, 'node_modules', 'lodash-es'),
          path.join(__dirname, 'node_modules', '@glimmer', 'compiler', 'dist'),
          path.join(__dirname, 'node_modules', '@glimmer', 'syntax', 'dist'),
          path.join(__dirname, 'node_modules', '@glimmer', 'util', 'dist'),
          path.join(__dirname, 'node_modules', '@glimmer', 'wire-format', 'dist'),
        ],
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            require.resolve('babel-preset-es2015'),
            require.resolve('babel-preset-stage-0'),
            require.resolve('babel-preset-react'),
          ],
          plugins: [
            [
              require.resolve('babel-plugin-transform-runtime'),
              // https://github.com/babel/babel/issues/2877 describes an issue
              // where babel inserts untranspiled import statements into a
              // module. That module then contains ES6 and CommonJS module code,
              // leading to issues with webpack. Disabling the polyfill seems
              // to fix it, and we probably don't need it anyway.
              // (should also result in smaller bundles)
              {polyfill: false},
            ],
          ],
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?importLoaders=1!autoprefixer-loader',
        }),
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
      ...(DEV ? [] : [
        {
          test: /\.jsx?$/,
          exclude: /flow_parser\.js/,
          loader: 'uglify-loader',
          enforce: 'post',
          options: {
            mangle: {
              except: ['Plugin', 'Tree', 'JSON'],
            },
            compress: {
              warnings: false,
            },
          },
        },
      ]),
    ],

    noParse: [
      /traceur\/bin/,
      /typescript\/lib/,
      /acorn\/dist\/acorn\.js/,
      /esprima\/dist\/esprima\.js/,
      /esprima-fb\/esprima\.js/,
    ],
  },

  node: {
    child_process: 'empty',
    fs: 'empty',
    module: 'empty',
    net: 'empty',
    readline: 'empty',
  },

  plugins: plugins,

  entry: {
    app: './src/app.js',
    style: './css/style.css',
  },

  output: {
    path: '../out',
    filename: DEV ? '[name].js' : '[name]-[chunkhash].js',
    chunkFilename: DEV ? '[name].js' : '[name]-[chunkhash].js',
  },
},

DEV ?
  {
    devtool: 'eval',
  } :
  {}
);
