import React from 'react';
import defaultParserInterface from './utils/defaultParserInterface';
import pkg from 'typescript/package.json';
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

let globalTS;
let getComments;

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  parse(code) {
    return new Promise((resolve, reject) => {
      require.ensure(['typescript'], require => {
        try {
          let ts = require('typescript');
          globalTS = ts;
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

          getComments = (node, isTrailing) => {
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

          resolve(sourceFile);
        } catch(err) {
          reject(err);
        }
      });
    });
  },

  getNodeName(node) {
    if (globalTS && node.kind) {
      return globalTS.SyntaxKind[node.kind]
    }
  },

  forEachProperty(node, callback) {
    for (var prop in node) {
      var result = callback({
        value: node[prop],
        key: prop,
      });
      if (result === false) {
        break;
      }
    }
    let comments = {
    ...getComments(node, true),
    ...getComments(node, false),
    };
    if (result !== false) {
      for (var prop in comments) {
        var result = callback({
          value: comments[prop],
          key: prop,
        });
        if (result === false) {
          break;
        }
      }
    }
  },

  nodeToRange(node) {
    if (typeof node.getStart === 'function' && typeof node.getEnd === 'function') {
      return [node.getStart(), node.getEnd()];
    } else if (typeof node.pos !== 'undefined' && typeof node.end !== 'undefined') {
      return [node.pos, node.end];
    }
  },

  opensOnDeepOpen(node, key) {
    return key !== 'parent';
  },

  opensByDefault(node, key) {
    return (
      key === 'statements' ||
      key === 'declarationList'
    );
  },

  renderSettings() {
    return SettingsRenderer({
      settings,
      values: options,
      onChange: changeOption,
    });
  },
};
