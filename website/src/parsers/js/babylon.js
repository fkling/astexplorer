import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from 'babylon5/package.json';

const ID = 'babylon';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['loc', 'start', 'end']),
  showInMenu: false,

  loadParser(callback) {
    require(['babylon5'], callback);
  },

  parse(babylon, code, parserSettings) {
    return babylon.parse(code, parserSettings);
  },

  getNodeName(node) {
    switch (typeof node.type) {
      case 'string':
        return node.type;
      case 'object':
        return `Token (${node.type.label})`;
    }
  },

  nodeToRange(node) {
    if (typeof node.start !== 'undefined') {
      return [node.start, node.end];
    }
  },

  getDefaultOptions() {
    return {
      sourceType: 'module',
      allowReserved: false,
      allowReturnOutsideFunction: false,
      strictMode: false,
      tokens: false,

      features: {
        'es7.asyncFunctions': true,
        'es7.classProperties': true,
        'es7.comprehensions': true,
        'es7.decorators': true,
        'es7.exportExtensions': true,
        'es7.functionBind': true,
        'es7.objectRestSpread': true,
        'es7.trailingFunctionCommas': true,
      },

      plugins: { jsx: true, flow: true },
    };
  },

  _getSettingsConfiguration(defaultOptions) {
    return {
      fields: [
        ['sourceType', ['module', 'script']],
        'allowReserved',
        'allowReturnOutsideFunction',
        'strictMode',
        'tokens',
        {
          key: 'features',
          title: 'Features',
          fields: Object.keys(defaultOptions.features),
          settings: settings => settings.features || {...defaultOptions.features},
        },
        {
          key: 'plugins',
          title: 'Plugins',
          fields: Object.keys(defaultOptions.plugins),
          settings: settings => settings.plugins || {...defaultOptions.plugins},
          values: plugins => Object.keys(defaultOptions.plugins).reduce(
            (obj, name) => ((obj[name] = name in plugins), obj),
            {},
          ),
          update: (plugins, name, value) => {
            if (value) {
              return {...plugins, [name]: true};
            }
            plugins = {...plugins};
            delete plugins[name];
            return plugins;
          },
        },
      ],
    };
  },

  _ignoredProperties: new Set([
    '__clone',
  ]),

};
