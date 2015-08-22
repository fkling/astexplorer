import pkg from 'esprima/package.json';

const options = {range: true, sourceType: 'module'};

export default {
  name: 'esprima',
  parse(code) {
    return new Promise((resolve, reject) => {
      loadjs(['esprima'], parser => {
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
