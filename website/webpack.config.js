const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const DEV = process.env.NODE_ENV !== 'production';
const CACHE_BREAKER = Number(fs.readFileSync(path.join(__dirname, 'CACHE_BREAKER')));

const plugins = [
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
    /cli-engine/,
    'node-libs-browser/mock/empty',
  ),
  new webpack.NormalModuleReplacementPlugin(
    /load-rules/,
    __dirname + '/src/parsers/js/transformers/eslint1/loadRulesShim.js',
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
    },
  ),

  // More shims

  // Doesn't look like jest-validate is useful in our case (prettier uses it)
  new webpack.NormalModuleReplacementPlugin(
    /jest-validate/,
    __dirname + '/src/shims/jest-validate.js',
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
  new webpack.ProgressPlugin({
    modules: false,
    activeModules: false,
    profile: false,
  }),
];

module.exports = Object.assign({
  optimization: {
    moduleIds: DEV ? 'named' : 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'initial',
      maxAsyncRequests: 5,
      cacheGroups: {
        parsers: {
          priority: 10,
          test: /\/src\/parsers\/|\/package\.json$/,
        },
        vendors: {
          test: /\/node_modules\//,
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_fnames: true,
        },
      }),
    ],
  },

  module: {
    rules: [
      {
        test: [
          /\.d\.ts$/,
        ],
        use: 'null-loader',
      },
      // Without this rule weback is loading the ESM version of esquery, which
      // causes an error since eslint uses `require('esquery')` (not
      // `require('esquery').default`) to load the module.
      {
        issuer: /eslint4/,
        resolve: {
          alias: {
            'esquery': 'esquery/dist/esquery.min.js',
          },
        },
      },
      {
        test: [
          /\/CLIEngine/,
          /\/globby/,
        ],
        issuer: /\/@typescript-eslint\//,
        use: 'null-loader',
      },
      {
        test: /\.txt$/,
        exclude: /node_modules/,
        loader: 'raw-loader',
      },
      {
        test: /\.(jsx?|mjs)$/,
        type: 'javascript/auto',
        exclude: /node_modules/,
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
  },

  output: {
    path: path.resolve(__dirname, '../out'),
    filename: DEV ? '[name].js' : `[name]-[contenthash]-${CACHE_BREAKER}.js`,
    chunkFilename: DEV ? '[name].js' : `[name]-[contenthash]-${CACHE_BREAKER}.js`,
  },
},

  DEV ?
    {
      devtool: 'eval',
    } :
    {},
);
