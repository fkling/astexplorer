import base from './base';
import pkg from 'babylon/package.json';
import {parse} from 'babylon';

const ID = 'babylon';
const defaultOptions = {
  sourceType: 'module',
  allowImportExportEverywhere: false,
  allowReturnOutsideFunction: false,
  plugins: [
    'asyncGenerators',
    'classConstructorCall',
    'classProperties',
    'decorators',
    'doExpressions',
    'exportExtensions',
    'flow',
    'functionSent',
    'functionBind',
    'jsx',
    'objectRestSpread',
    'dynamicImport',
  ],
};

const settingsConfiguration = {
  fields: [
    ['sourceType', ['module', 'script']],
    'allowReturnOutsideFunction',
    'allowImportExportEverywhere',
    {
      key: 'plugins',
      title: 'Plugins',
      fields: defaultOptions.plugins,
      settings: settings => settings.plugins || defaultOptions.plugins,
      values: plugins => defaultOptions.plugins.reduce(
        (obj, name) => ((obj[name] = plugins.indexOf(name) > -1), obj),
        {}
      ),
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

  load() {
    return Promise.resolve({parse});
  },

};
