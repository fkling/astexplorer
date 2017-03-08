import base from './base.js';
import pkg from 'acorn/package.json';

import * as acorn from 'acorn';
import {parse_dammit} from 'acorn/dist/acorn_loose.js';
import jsxInject from 'acorn-jsx/inject';

const defaultOptions = {
  ecmaVersion: 7,
  sourceType: 'module',
  allowReserved: false,
  allowReturnOutsideFunction: false,
  allowImportExportEverywhere: false,
  allowHashBang: false,
  locations: false,
  loose: false,
  ranges: false,
  preserveParens: false,
  'plugins.jsx': true,
};

const settingsConfiguration = {
  fields: [
    ['ecmaVersion', [3, 5, 6, 7], x => Number(x)],
    ['sourceType', ['script', 'module']],
    'allowReserved',
    'allowReturnOutsideFunction',
    'allowImportExportEverywhere',
    'allowHashBang',
    'locations',
    'loose',
    'ranges',
    'preserveParens',
    'plugins.jsx',
  ],
};

export default {
  ...base,

  id: `acorn@${pkg.version}`,
  version: `${pkg.version}`,
  defaultOptions,
  settingsConfiguration,

  load() {
    return Promise.resolve({
      loose: parse_dammit,
      parse: jsxInject(acorn).parse,
    });
  },
};
