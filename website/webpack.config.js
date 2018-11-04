const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const DEV = process.env.NODE_ENV !== 'production';
const CACHE_BREAKER = Number(fs.readFileSync(path.join(__dirname, 'CACHE_BREAKER')));

const packages = fs.readdirSync(path.join(__dirname, 'packages'));
const vendorRegex = new RegExp(`/node_modules/(?!${packages.join('|')}/)`);

const plugins = [
  new WebpackChunkHash(),
  new webpack.DefinePlugin({
    'process.env.API_HOST': JSON.stringify(process.env.API_HOST || ''),
  }),
  new webpack.IgnorePlugin(/\.md$/),
  new webpack.IgnorePlugin(/node\/nodeLoader.js/),
  // Usually babel-eslint tries to patch eslint, but we are using "parseNoPatch",
  // so that code patch will never be executed.
  new webpack.IgnorePlugin(/^eslint$/, /babel-eslint/),

  // Prettier //

  // We don't use these parsers with prettier, so we don't need to include them
  new webpack.IgnorePlugin(/parser-flow/, /\/prettier/),
  new webpack.IgnorePlugin(/parser-glimmer/, /\/prettier/),
  new webpack.IgnorePlugin(/parser-graphql/, /\/prettier/),
  new webpack.IgnorePlugin(/parser-markdown/, /\/prettier/),
  new webpack.IgnorePlugin(/parser-parse5/, /\/prettier/),
  new webpack.IgnorePlugin(/parser-postcss/, /\/prettier/),
  new webpack.IgnorePlugin(/parser-typescript/, /\/prettier/),
  new webpack.IgnorePlugin(/parser-vue/, /\/prettier/),
  new webpack.IgnorePlugin(/parser-yaml/, /\/prettier/),

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

  new MiniCssExtractPlugin({
    filename: DEV ? '[name].css' : `[name]-[contenthash]-${CACHE_BREAKER}.css`,
    allChunks: true,
  }),

  new HtmlWebpackPlugin({
    favicon: './favicon.png',
    inject: 'body',
    filename: 'index.html',
    template: './index.ejs',
    chunksSortMode: 'id',
  }),

  // Inline runtime and manifest into the HTML. It's small and changes after every build.
  new InlineManifestWebpackPlugin(),
  DEV ?
    new webpack.NamedModulesPlugin() :
    new webpack.HashedModuleIdsPlugin(),
  new ProgressBarPlugin(),
];

module.exports = Object.assign({
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        parsermeta: {
          priority: 10,
          test: /\/package\.json$/,
          chunks(chunk) {
            return chunk.name === 'app';
          },
          minChunks: 1,
          minSize: 1,
        },
        vendors: {
          test: vendorRegex,
          chunks(chunk) {
            return chunk.name === 'app';
          },
        },
      },
    },
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          ecma: 8,
          keep_fnames: true,
        },
      }),
    ],
  },

  module: {
    rules: [
      {
        test: /\.txt$/,
        exclude: /node_modules/,
        loader: 'raw-loader',
      },
      {
        test: /\.(jsx?|mjs)$/,
        type: 'javascript/auto',
        include: [
          // To transpile our version of acorn as well as the one that
          // espree uses (somewhere in its dependency tree)
          /\/acorn.es.js$/,
          /\/acorn.mjs$/,
          /\/acorn-loose.mjs$/,
          path.join(__dirname, 'node_modules', '@glimmer', 'compiler', 'dist'),
          path.join(__dirname, 'node_modules', '@glimmer', 'syntax', 'dist'),
          path.join(__dirname, 'node_modules', '@glimmer', 'util', 'dist'),
          path.join(__dirname, 'node_modules', '@glimmer', 'wire-format', 'dist'),
          path.join(__dirname, 'node_modules', 'ast-types'),
          path.join(__dirname, 'node_modules', 'babel-eslint'),
          path.join(__dirname, 'node_modules', 'babel-eslint8'),
          path.join(__dirname, 'node_modules', 'jsesc'),
          path.join(__dirname, 'node_modules', 'eslint-visitor-keys'),
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
          path.join(__dirname, 'src'),
        ],
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            [
              require.resolve('@babel/preset-env'),
              {
                targets: {
                  browsers: ['defaults'],
                },
                modules: 'commonjs',
              },
            ],
            require.resolve('@babel/preset-react'),
          ],
          plugins: [
            require.resolve('@babel/plugin-transform-runtime'),
          ],
        },
      },
      {
        test: /\.css$/,
        use: [
          DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          'postcss-loader',
        ],
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
      /acorn\/dist\/acorn\.mjs/,
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
