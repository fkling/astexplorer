import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'rehype/package.json';

const ID = 'rehype';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['position']),

  loadParser(callback) {
    require([
      'rehype',
    ], callback);
  },

  parse(rehype, code, options) {
    return rehype().data('settings', options).parse(code)
  },

  nodeToRange({ position }) {
    if (position) {
      return [position.start.offset, position.end.offset];
    }
  },

  opensByDefault(node, key) {
    return key === 'children';
  },

  getDefaultOptions() {
    return {
      fragment: true,
      space:'html',
      emitParseErrors: false,
    };
  },

  _getSettingsConfiguration() {
    return {
      fields : [
        'fragment',
        ['space',['svg','html']],
        'emitParseErrors',
      ],
    };
  },
};
