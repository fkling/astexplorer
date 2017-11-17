import React from 'react';
import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'vue-template-compiler/package.json';
import SettingsRenderer from '../utils/SettingsRenderer';

const ID = 'vue-template-compiler';
const defaultOptions = {
};

const parserSettingsConfiguration = {
  fields : [
    // ['treeAdapter', ['default', 'htmlparser2']],
  ],
};

const setName = (node, value) => {
  Object.defineProperty(node, '_$$name', {value, enumerable: false});
};

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['__location']),

  loadParser(callback) {
    require([
      'vue-template-compiler',
    ], (compiler) => {
      callback({
        compiler,
      });
    });
  },

  parse({compiler}, code, options) {
    this.options = {...defaultOptions, ...options};
    const obj = compiler.compile(code, this.options);

    return obj.ast;
  },

  getNodeName(node) {
    const {type, tag, _$$name} = node;

    if (_$$name) {
      return _$$name;
    }

    switch(type) {
      case 1: {
        const {attrsList = [], attrsMap = {}, directives = []} = node;
        attrsList.forEach(n => setName(n, '#Attr'));
        directives.forEach(n => setName(n, `#v-${n.name}`));
        setName(attrsMap, '#Attrs');
        return tag;
      }
      case 2:
        return '#expression';
      case 3:
        return '#text';
      default:
        return '?'
    }
  },

  opensByDefault(node, key) {
    return key === 'children';
  },

  renderSettings(parserSettings, onChange) {
    return (
      <SettingsRenderer
        settingsConfiguration={parserSettingsConfiguration}
        parserSettings={{...defaultOptions, ...parserSettings}}
        onChange={onChange}
      />
    );
  },

  _ignoredProperties: new Set(['parent']),
};
