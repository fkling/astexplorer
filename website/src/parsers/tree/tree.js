import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'mol_tree/package.json';

export default {
  ...defaultParserInterface,

  id: 'UA-81889051-2',
  displayName: 'mol_tree',
  version: pkg.version,
  homepage: pkg.homepage || 'https://github.com/nin-jin/tree.d',

  locationProps: new Set(['baseUri','uri','col','row']),
  typeProps: new Set(['type']),

  loadParser(callback) {
    require(['mol_tree/web.js'], callback);
  },

  parse($, code) {
    return $.$mol_tree.fromString(code, 'codeExample.txt');
  },

  getNodeName(tree) {
    return tree.type;
  },

  opensByDefault(tree,field) {
    if (field === 'sub') return true;
    return false;
  },

  *forEachProperty(node) {
    for (let prop of [...Object.keys(node),'uri']) {
      if (this._ignoredProperties.has(prop)) {
        continue;
      }
      yield {
        value: node[prop],
        key: prop,
        computed: false,
      }
    }
  },

}
