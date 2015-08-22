import pkg from 'acorn/package.json';

const options = {
  ecmaVersion: 6,
  ranges: true,
  sourceType: 'module',
};

export default {
  name: 'acorn',
  parse(code) {
    return new Promise((resolve, reject) => {
      loadjs(['acorn'], parser => {
        try {
          resolve(parser.parse(code, options));
        } catch(error) {
          reject(error);
        }
      }, error => (resolve(null), console.error(error)));
    });
  },

  nodeToRange(node) {
    return node.range;
  },

  version: pkg.version,
  homepage: pkg.homepage,
};
