const webpackConfig = require('../../webpack.default.conf');

module.exports = {
  name: 'babylon',
  displayName: 'babylon',
  homepage: 'https://github.com/babel/babylon',
  category: 'JavaScript',
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
