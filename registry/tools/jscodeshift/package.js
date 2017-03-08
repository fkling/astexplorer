const webpackConfig = require('../../webpack.default.conf');

module.exports = {
  name: 'jscodeshift',
  displayName: 'jscodeshift',
  homepage: 'https://github.com/facebook/jscodeshift',
  category: 'JavaScript',
  versions: [
    {
      main: './v0.3.4.js',
      dependencies: {
        jscodeshift: '0.3.4 - 0.3.20',
      },
      webpackConfig,
    },
    {
      main: './v0.3.21.js',
      dependencies: {
        jscodeshift: '^0.3.21',
      },
      webpackConfig: Object.assign(
        {},
        webpackConfig,
        {
          module: {
            rules: [
              {
                test: /\.txt$/,
                exclude: /node_modules/,
                loader: 'raw-loader',
              },
              {
                test: /\.jsx?$/,
                exclude: /node_modules\/(?!jscodeshift\/dist)/,
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
        }
      ),
    },
  ],
};
