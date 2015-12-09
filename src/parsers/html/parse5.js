import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'parse5/package.json';
import SettingsRenderer from '../utils/SettingsRenderer';
import * as LocalStorage from '../../LocalStorage';

const ID = 'parse5';
const options = {
  treeAdapter: 'default',
  decodeHtmlEntities: true,
  ...LocalStorage.getParserSettings(ID),
};

const settings = [
  ['treeAdapter', ['default', 'htmlparser2']],
  'decodeHtmlEntities',
];

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  loadParser(callback) {
    require([
      'parse5/lib/tree_construction/parser',
      'parse5/lib/tree_adapters/default',
      'parse5/lib/tree_adapters/htmlparser2',
    ], (Parser, defaultAdapter, htmlparser2Adapter) => {
      callback({
        Parser,
        TreeAdapters: {
          default: defaultAdapter,
          htmlparser2: htmlparser2Adapter,
        },
      });
    });
  },

  parse({ Parser, TreeAdapters }, code) {
    return new Parser(TreeAdapters[options.treeAdapter], {
      locationInfo: true,
      decodeHtmlEntities: options.decodeHtmlEntities,
    }).parse(code);
  },

  getNodeName(node) {
    if (options.treeAdapter === 'htmlparser2') {
      return node.type + (node.name && node.type !== 'root' ? `(${node.name})` : '');
    } else {
      return node.nodeName;
    }
  },

  nodeToRange({ __location: loc }) {
    if (loc) {
      return [loc.start, loc.end];
    }
  },

  opensByDefault(node, key) {
    return key === 'children' || key === 'childNodes';
  },

  renderSettings() {
    return SettingsRenderer({
      settings,
      values: options,
      onChange: changeOption,
    });
  },

  _ignoredProperties: new Set(['parentNode', 'prev', 'next', 'parent', 'firstChild', 'lastChild']),
};

function changeOption(name, {target}) {
  let value;
  switch (name) {
    case 'treeAdapter':
      value = target.value;
      break;
    default:
      value = target.checked;
  }
  options[name] = value;
  LocalStorage.setParserSettings(ID, options);
}
