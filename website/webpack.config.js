const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const DEV = process.env.NODE_ENV !== 'production';
const CACHE_BREAKER = 16;

const packages = fs.readdirSync(path.join(__dirname, 'packages'));
const vendorRegex = new RegExp(`/node_modules/(?!${packages.join('|')}/)`);

const plugins = [
  new WebpackChunkHash(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV':
      JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.API_HOST': JSON.stringify(process.env.API_HOST || ''),
  }),
  new webpack.IgnorePlugin(/\.md$/),
  new webpack.IgnorePlugin(/node\/nodeLoader.js/),
  // Usually babel-eslint tries to patch eslint, but we are using "parseNoPatch",
  // so that code patch will never be executed.
  new webpack.IgnorePlugin(/^eslint$/, /babel-eslint/),

  // Prettier //

  // We don't use these parsers with prettier, so we don't need to include them
  new webpack.IgnorePlugin(/parser-graphql/, /\/prettier/),
  new webpack.IgnorePlugin(/parser-wat/, /\/prettier/),
  new webpack.IgnorePlugin(/parser-json/, /\/prettier/),
  new webpack.IgnorePlugin(/parser-parse5/, /\/prettier/),
  new webpack.IgnorePlugin(/parser-postcss/, /\/prettier/),

  // eslint //

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

  // More shims

  // Doesn't look like jest-validate is useful in our case (prettier uses it)
  new webpack.NormalModuleReplacementPlugin(
    /jest-validate/,
    __dirname + '/src/shims/jest-validate.js'
  ),

  // Hack to disable Webpack dynamic requires in ESLint, so we don't end up
  // bundling the entire ESLint directory including files we don't even need.
  // https://github.com/webpack/webpack/issues/198
  new webpack.ContextReplacementPlugin(/eslint/, /NEVER_MATCH^/),

  new ExtractTextPlugin({
    filename: DEV ? '[name].css' : `[name]-[chunkhash]-${CACHE_BREAKER}.css`,
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
          // To transpile our version of acorn as well as the one that
          // espree uses (somewhere in its dependency tree)
          /\/acorn.es.js$/,
          path.join(__dirname, 'node_modules', '@glimmer', 'compiler', 'dist'),
          path.join(__dirname, 'node_modules', '@glimmer', 'syntax', 'dist'),
          path.join(__dirname, 'node_modules', '@glimmer', 'util', 'dist'),
          path.join(__dirname, 'node_modules', '@glimmer', 'wire-format', 'dist'),
          path.join(__dirname, 'node_modules', 'ast-types'),
          path.join(__dirname, 'node_modules', 'babel-eslint'),
          path.join(__dirname, 'node_modules', 'babel7'),
          path.join(__dirname, 'node_modules', 'babel-plugin-macros'),
          path.join(__dirname, 'node_modules', 'json-parse-better-errors'),
          path.join(__dirname, 'node_modules', 'babylon7'),
          path.join(__dirname, 'node_modules', 'eslint', 'lib'),
          path.join(__dirname, 'node_modules', 'eslint-scope'),
          path.join(__dirname, 'node_modules', 'eslint-visitor-keys'),
          path.join(__dirname, 'node_modules', 'eslint3'),
          path.join(__dirname, 'node_modules', 'eslint4'),
          path.join(__dirname, 'node_modules', 'jscodeshift', 'src'),
          path.join(__dirname, 'node_modules', 'lodash-es'),
          path.join(__dirname, 'node_modules', 'prettier'),
          path.join(__dirname, 'node_modules', 'react-redux', 'es'),
          path.join(__dirname, 'node_modules', 'recast'),
          path.join(__dirname, 'node_modules', 'redux', 'es'),
          path.join(__dirname, 'node_modules', 'redux-saga', 'es'),
          path.join(__dirname, 'node_modules', 'regexp-tree'),
          path.join(__dirname, 'node_modules', 'simple-html-tokenizer'),
          path.join(__dirname, 'node_modules', 'symbol-observable', 'es'),
          path.join(__dirname, 'node_modules', 'typescript-eslint-parser'),
          path.join(__dirname, 'node_modules', 'webidl2'),
          path.join(__dirname, 'node_modules', 'tslint'),
          path.join(__dirname, 'node_modules', 'tslib'),
          path.join(__dirname, 'node_modules', 'yaml-unist-parser'),
          path.join(__dirname, 'src'),
        ],
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            [
              require.resolve('babel-preset-env'),
              {
                targets: {
                  browsers: ['defaults'],
                },
              },
            ],
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
              { polyfill: false },
            ],
          ],
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 1 },
            },
            'postcss-loader',
          ],
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
          // TODO: Figure out how to enable minification for php-parser.
          // See https://github.com/fkling/astexplorer/pull/253 for more info.
          exclude: /flow_parser\.js|\/php-parser\//,
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
      // This is necessary because flow is trying to load the 'fs' module, but
      // dynamically. Without this webpack will throw an error at runtime.
      // I assume the `require(...)` call "succeeds" because 'fs' is shimmed to
      // be empty below.
      /flow-parser\/flow_parser\.js/,
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
    path: path.resolve(__dirname, '../out'),
    filename: DEV ? '[name].js' : `[name]-[chunkhash]-${CACHE_BREAKER}.js`,
    chunkFilename: DEV ? '[name].js' : `[name]-[chunkhash]-${CACHE_BREAKER}.js`,
  },
},

  DEV ?
    {
      devtool: 'eval',
    } :
    {}
);
