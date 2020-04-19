import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'webidl2/package.json';

const ID = 'webidl2';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage || 'https://github.com/w3c/webidl2.js',
  typeProps: new Set(['name', 'type', 'idlType', 'escapedName']),

  getNodeName(node) {
    if (node.name) {
        return node.name + (node.optional ? '?' : '');
    } else if (node.type) {
        return node.type;
    } else if (node.idlType) {
        return node.idlType.idlType || node.idlType;
    }
  },

  loadParser(callback) {
    require(['webidl2'], callback);
  },

  parse({ parse }, code, options) {
    return parse(code, options);
  },

  opensByDefault(node, key) {
    return key === 'members';
  },

  getDefaultOptions() {
    return {
      concrete: false,
    };
  },
};
