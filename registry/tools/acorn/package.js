const path = require('path');

function getRollupConfig(packageDir) {
  return  {
    'rollup-plugin-commonjs': {
      namedExports: {
        [path.join(packageDir, 'node_modules/acorn/dist/acorn_loose.js')]: [
          'parse_dammit',
        ],
        [path.join(packageDir, 'node_modules/acorn/dist/acorn.js')]: [
          'parse',
        ],
      },
    },
  };
}

module.exports = {
  displayName: 'acorn',
  versions: [
    {
      main: './v2.js',
      dependencies: {
        acorn: '^2.0.0',
        'acorn-jsx': '^2.0.0'
      },
      getRollupConfig,
    },
    {
      main: './v3.js',
      dependencies: {
        acorn: '^3.0.0',
        'acorn-jsx': '^3.0.0'
      },
      getRollupConfig,
    },
    {
      main: './v4.js',
      dependencies: {
        acorn: '^4.0.0',
        'acorn-jsx': '^3.0.0'
      },
      getRollupConfig,
    },
  ],
};
