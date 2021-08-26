import PropTypes from 'prop-types';
import React from 'react';
import prettier from 'prettier/standalone';
import prettierBabelParser from 'prettier/parser-babel';
import Editor from '../Editor';
import {types} from 'babel7';

const {BUILDER_KEYS} = types;

export default function Builder({parseResult}) {
  const nodes = parseResult.ast.body || parseResult.ast.program && parseResult.ast.program.body;
  if (!Array.isArray(nodes)) {
    return <div>Current parser not supported for builder view</div>
  }
  const builderCode = 'const t = require(\'@babel/types\');\n\n' + getFormattedBuilders(nodes).join('\n');
  return (
    <Editor value={builderCode}/>
  );
}

function getFormattedBuilders(nodes) {
  const entries = nodes.map(node => convertNodeToBuilder(node));
  const options = {
    printWidth: 50,
    tabWidth: 2,
    singleQuote: false,
    trailingComma: 'none',
    bracketSpacing: true,
    jsxBracketSameLine: false,
    parser: 'babel',
    plugins: [prettierBabelParser],
  };
  return entries.map(code => prettier.format(code, options));
}

function convertNodeToBuilder(node) {
  if (node.type === 'Literal') {
    return `"${node.value}"`;
  }
  const keys = BUILDER_KEYS[node.type];
  const result = `t.${node.type}(${keys.map(key => handleKey(key)).join(',')})`

  function handleKey(key) {
    const value = node[key];
    if (typeof value === 'boolean') {
      return `${value}`;
    } else if (typeof value === 'string') {
      return `"${value}"`;
    } else if (typeof value === 'number') {
      return value;
    } else if (Array.isArray(value)) {
      return `[${value.map(node => convertNodeToBuilder(node)).join(', ')}]`;
    } else if (value && typeof value.type === 'string' && BUILDER_KEYS[value.type]) {
      return convertNodeToBuilder(value);
    } else if (value && value.type === 'Literal') {
      return `"${value.value}"`;
    } else {
      return JSON.stringify(value);
    }
  }
  return result;
}


Builder.propTypes = {
  parseResult: PropTypes.object,
};
