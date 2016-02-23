import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'webidl2/package.json';
import SettingsRenderer from '../utils/SettingsRenderer';
import * as LocalStorage from '../../LocalStorage';

const ID = 'webidl2';
const options = {
  allowNestedTypedefs: false,
  ...LocalStorage.getParserSettings(ID),
};

const settings = Object.keys(options);

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

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

  parse({ parse }, code) {
    return parse(code, options);
  },

  opensByDefault(node, key) {
    return key === 'members';
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
