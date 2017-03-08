import base from './base';
import pkg from 'babylon/package.json';
import {parse} from 'babylon';

const ID = 'babylon';
const defaultOptions = {
  sourceType: 'module',
  allowReserved: false,
  allowReturnOutsideFunction: false,
  strictMode: false,

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

const settingsConfiguration = {
  fields: [
    ['sourceType', ['module', 'script']],
    'allowReserved',
    'allowReturnOutsideFunction',
    'strictMode',
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
        {}
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

export default {
  ...base,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  defaultOptions,
  settingsConfiguration,

  _ignoredProperties: new Set([
    '__clone',
  ]),

  load() {
    return Promise.resolve({parse});
  },

};
