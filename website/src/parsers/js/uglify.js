import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from '../../../node_modules/uglify-es/package.json';
import compileModule from '../utils/compileModule';

const ID = 'uglify-js';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['start', 'end']),

  loadParser(callback) {
    require([
      'raw-loader!../../../node_modules/uglify-es/lib/utils.js',
      'raw-loader!../../../node_modules/uglify-es/lib/ast.js',
      'raw-loader!../../../node_modules/uglify-es/lib/parse.js',
    ], (...contents) => {
      contents.push('exports.parse = parse;');
      callback(compileModule(contents.join('\n\n')));
    });
  },

  parse(UglifyJS, code) {
    return UglifyJS.parse(code);
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
