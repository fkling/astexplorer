const webpackConfig = require('../../webpack.default.conf');

module.exports = {
  displayName: 'babylon',
  homepage: 'https://github.com/babel/babylon',
  versions: [
    {
      main: './v5.js',
      dependencies: {
        babylon: '^5.0.0',
      },
      webpackConfig,
    },
    {
      main: './v6.js',
      dependencies: {
        babylon: '^6.0.0',
      },
      webpackConfig,
    },
  ],
};
