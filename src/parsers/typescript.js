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

        const sourceFile = program.getSourceFile(filename);

        const getComments = (node, isTrailing) => {
          if (node.parent) {
            const nodePos = isTrailing ? node.end : node.pos;
            const parentPos = isTrailing ? node.parent.end : node.parent.pos;

            if (node.parent.kind === ts.SyntaxKind.SourceFile || nodePos !== parentPos) {
              let comments = isTrailing ?
                ts.getTrailingCommentRanges(sourceFile.text, nodePos) :
                ts.getLeadingCommentRanges(sourceFile.text, nodePos);

              if (Array.isArray(comments)) {
                comments.forEach((comment) => {
                  comment.type = ts.SyntaxKind[comment.kind];
                  comment.text = sourceFile.text.substring(comment.pos, comment.end);
                });

                if (isTrailing) {
                  node.trailingComments = comments;
                } else {
                  node.leadingComments = comments;
                }
              }
            }
          }
        };

        const transformNode = (node) => {
          if (typeof node === 'object' && node.kind) {
            if (typeof node.type !== 'undefined') {
              node._typescriptType = node.type;
            }
            node.type = ts.SyntaxKind[node.kind];
            getComments(node, false);
            getComments(node, true);
          }

          ts.forEachChild(node, transformNode);
        };

        transformNode(sourceFile);

        return sourceFile;
      }
    );
  },

  nodeToRange(node) {
    if (typeof node.getStart === 'function' && typeof node.getEnd === 'function') {
      return [node.getStart(), node.getEnd()];
    } else if (typeof node.pos !== 'undefined' && typeof node.end !== 'undefined') {
      return [node.pos, node.end];
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
