import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'shift-parser/package.json';
import SettingsRenderer from '../utils/SettingsRenderer';
import * as LocalStorage from '../../LocalStorage';

const ID = 'shift';
const options = {
  loc: true,
  earlyErrors: false,
  sourceType: 'module',
  ...LocalStorage.getParserSettings(ID),
};

const settings = [
  'loc',
  'earlyErrors',
  ['sourceType', ['script', 'module']],
];

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: ['loc'],

  loadParser(callback) {
    require(['shift-parser'], callback);
  },

  parse(shift, code) {
    if (options.sourceType === 'module') {
      return shift.parseModule(code, options);
    } else {
      return shift.parseScript(code, options);
    }
  },

  nodeToRange({ loc }) {
    if (loc) {
      return [loc.start.offset, loc.end.offset];
    }
  },

  renderSettings() {
    return SettingsRenderer({
      settings,
      required: new Set(['loc']),
      values: options,
      onChange: changeOption,
    });

  },

  opensByDefault(node, key) {
    return (
      key === 'items' ||
      key === 'declaration' ||
      key === 'declarators' ||
      key === 'statements' ||
      key === 'expression' ||
      key === 'body'
    );
  },
};

function changeOption(name, {target}) {
  let value;
  switch (name) {
    case 'sourceType':
      value = target.value;
      break;
    default:
      value = target.checked;
  }
  options[name] = value;
  LocalStorage.setParserSettings(ID, options);
}
