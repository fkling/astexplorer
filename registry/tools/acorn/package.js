const webpackConfig = require('../../webpack.default.conf');

module.exports = {
  displayName: 'acorn',
  homepage: 'https://github.com/ternjs/acorn',
  versions: [
    {
      main: './v2.js',
      dependencies: {
        acorn: '^2.0.0',
        'acorn-jsx': '^2.0.0'
      },
      webpackConfig,
    },
    {
      main: './v3.js',
      dependencies: {
        acorn: '^3.0.0',
        'acorn-jsx': '^3.0.0'
      },
      webpackConfig,
    },
    {
      main: './v4.js',
      dependencies: {
        acorn: '^4.0.0',
        'acorn-jsx': '^3.0.0'
      },
      webpackConfig,
    },
  ],
};
