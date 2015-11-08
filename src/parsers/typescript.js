import React from 'react';
import pkg from 'typescript/package.json';
import loadAndExecute from './utils/loadAndExecute';
import SettingsRenderer from './utils/SettingsRenderer';
import * as LocalStorage from '../LocalStorage';

const ID = 'typescript';
const FILENAME = 'astExplorer.ts';
const options = Object.assign(
  {
    experimentalDecorators: true,
    experimentalAsyncFunctions: true,
    jsx: true,
  },
  LocalStorage.getParserSettings(ID)
);

const settings = [
  'experimentalDecorators',
  'experimentalAsyncFunctions',
  'jsx',
];

const changeOption = (name, {target}) => {
  options[name] = target.checked;
  LocalStorage.setParserSettings(ID, options);
};

export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  parse(code) {
    return loadAndExecute(
      ['typescript'],
      (ts) => {
        const compilerHost: ts.CompilerHost = {
          fileExists: () => true,
          getCanonicalFileName: (filename: string) => filename,
          getCurrentDirectory: () => '',
          getDefaultLibFileName: () => 'lib.d.ts',
          getNewLine: () => '\n',
          getSourceFile: (filename: string) => {
            return ts.createSourceFile(filename, code, ts.ScriptTarget.Latest, true);
          },
          readFile: () => null,
          useCaseSensitiveFileNames: () => true,
          writeFile: () => null,
        };

        const filename = FILENAME + (options.jsx ? 'x' : '');

        const program = ts.createProgram([filename], {
          noResolve: true,
          target: ts.ScriptTarget.Latest,
          experimentalDecorators: options.experimentalDecorators,
          experimentalAsyncFunctions: options.experimentalAsyncFunctions,
          jsx: options.jsx ? 'preserve' : undefined,
        }, compilerHost);

        const transformNode = (node) => {
          node.type = ts.SyntaxKind[node.kind];
          ts.forEachChild(node, transformNode);
        };

        const sourceFile = program.getSourceFile(filename);
        transformNode(sourceFile);

        return sourceFile;
      }
    );
  },

  nodeToRange(node) {
    if (typeof node.getStart === 'function' && typeof node.getEnd === 'function') {
      return [node.getStart(), node.getEnd()];
    }
  },

  renderSettings() {
     return SettingsRenderer({
       settings,
       values: options,
       onChange: changeOption,
     });
   },
};
