import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'graphql/package.json';
import SettingsRenderer from '../utils/SettingsRenderer';
import * as LocalStorage from '../../LocalStorage';

const ID = 'graphql-js';
const options = {
  noLocation: false,
  noSource: false,
  ...LocalStorage.getParserSettings(ID),
};

const settings = Object.keys(options);

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  loadParser(callback) {
    require(['graphql/language'], ({ parse }) => {
      callback({ parse });
    });
  },

  parse({ parse }, code) {
    return parse(code, options);
  },

  nodeToRange(node) {
    if (node.loc) {
      return [node.loc.start, node.loc.end];
    }
  },

  getNodeName(node) {
    return node.kind;
  },

  opensByDefault(node, key) {
    return key === 'definitions';
  },

  renderSettings() {
    return SettingsRenderer({
      settings,
      values: options,
      onChange: changeOption,
    });
  },
};

function changeOption(name, {target}) {
  options[name] = target.checked;
  LocalStorage.setParserSettings(ID, options);
}
