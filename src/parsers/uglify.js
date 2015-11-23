import defaultParserInterface from './utils/defaultParserInterface';
import pkg from 'uglify-js/package.json';
import SettingsRenderer from './utils/SettingsRenderer';
import * as LocalStorage from '../LocalStorage';

const ID = 'uglify-js';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  parse(code) {
    return new Promise((resolve, reject) => {
      require.ensure([
        'raw!uglify-js/lib/utils.js',
        'raw!uglify-js/lib/ast.js',
        'raw!uglify-js/lib/parse.js',
      ], require => {
        try {
          const contents = [
            require('raw!uglify-js/lib/utils.js'),
            require('raw!uglify-js/lib/ast.js'),
            require('raw!uglify-js/lib/parse.js'),
            'exports.parse = parse;',
            'return exports;'
          ].join('\n\n');
          const UglifyJS = {};
          // UglifyJS uses concatenation instead of module system,
          // so we need to simulate it in browser as well.
          new Function('exports', contents)(UglifyJS);
          resolve(UglifyJS.parse(code));
        } catch(err) {
          err.lineNumber = err.line;
          reject(err);
        }
      });
    });
  },

  getNodeName(node) {
    let type = node.TYPE;
    if (type === 'Token') {
      type += `(${node.type})`;
    }
    return type;
  },

  nodeToRange(node) {
    let start, end;
    switch (node.TYPE) {
      case 'Token':
        start = end = node;
        break;
      case undefined:
        return;
      default:
        ({ start, end } = node);
        break;
    }
    return [start.pos, end.endpos];
  },

  opensByDefault(node, key) {
    return (
      key === 'body' ||
      key === 'elements' || // array literals
      key === 'definitions' || // variable declaration
      key === 'properties'
    );
  },

  _ignoredProperties: new Set(['_walk', 'CTOR']),
};