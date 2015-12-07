import defaultParserInterface from './utils/defaultParserInterface';
import pkg from 'uglify-js/package.json';
import compileModule from '../utils/compileModule';

const ID = 'uglify-js';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  loadParser(callback) {
    require([
      'raw!uglify-js/lib/utils.js',
      'raw!uglify-js/lib/ast.js',
      'raw!uglify-js/lib/parse.js'
    ], (...contents) => {
      contents.push('exports.parse = parse;');
      callback(compileModule(contents.join('\n\n')));
    });
  },

  parse(UglifyJS, code) {
    try {
      return UglifyJS.parse(code);
    } catch (err) {
      err.lineNumber = err.line;
      throw err;
    }
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
