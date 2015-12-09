import defaultParserInterface from './utils/defaultCSSParserInterface';
import pkg from 'postcss/package.json';
import SettingsRenderer from '../utils/SettingsRenderer';
import * as LocalStorage from '../../LocalStorage';

const ID = 'postcss';
const options = {
  parser: 'built-in',
  ...LocalStorage.getParserSettings(ID),
};

const settings = [
  ['parser', ['built-in', 'scss', 'safe-parser']],
];

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  loadParser(callback) {
    require(['postcss/lib/parse', 'postcss-scss/lib/scss-parse', 'postcss-safe-parser'], (builtIn, scss, safe) => {
      callback({
        'built-in': builtIn,
        scss,
        'safe-parser': safe,
      });
    });
  },

  parse(parsers, code) {
    return defaultParserInterface.parse.call(this, parsers[options.parser], code);
  },

  nodeToRange({ source: range }) {
    if (!range || !range.end) return;
    return [
      this.getOffset(range.start),
      this.getOffset(range.end) + 1,
    ];
  },

  opensByDefault(node, key) {
    return key === 'nodes';
  },

  _ignoredProperties: new Set(['parent', 'input']),

  renderSettings() {
    return SettingsRenderer({
      settings,
      values: options,
      onChange: changeOption,
    });
  },
};

function changeOption(name, {target}) {
  options[name] = target.value;
  LocalStorage.setParserSettings(ID, options);
}
