import pkg from 'babylon/package.json';

const options = {
  sourceType: 'module',
  features: {
    'es7.decorators': true,
    'es7.comprehensions': true,
    'es7.classProperties': true,
    'es7.asyncFunctions': true,
    'es7.exportExtensions': true,
    'es7.objectRestSpread': true,
    'es7.trailingFunctionCommas': true,
  },
  plugins: { jsx: true, flow: true },
};

export default {
  parse(code) {
    return new Promise((resolve, reject) => {
      loadjs(['babylon'], babylon => {
        try {
          resolve(babylon.parse(code, options));
        } catch(error) {
          reject(error);
        }
      }, error => (resolve(null), console.error(error)));
    });
  },

  nodeToRange(node) {
    if (typeof node.start !== 'undefined') {
      return [node.start, node.end];
    }
  },

  version: pkg.version,
  homepage: pkg.homepage,
};
