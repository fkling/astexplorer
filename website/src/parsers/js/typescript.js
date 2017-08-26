import React from 'react';
import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'typescript/package.json';
import SettingsRenderer from '../utils/SettingsRenderer';

const ID = 'typescript';
const FILENAME = 'astExplorer.ts';

const defaultOptions = {
  experimentalDecorators: true,
  experimentalAsyncFunctions: true,
  jsx: true,
};

const parserSettingsConfiguration = {
  fields: [
    'experimentalDecorators',
    'experimentalAsyncFunctions',
    'jsx',
  ],
};

let ts;
let getComments;

// workarounds issue described at https://github.com/Microsoft/TypeScript/issues/18062
const syntaxKindFix = {
    0: 'Unknown',
    2: 'SingleLineCommentTrivia',
    7: 'ConflictMarkerTrivia',
    8: 'NumericLiteral',
    13: 'NoSubstitutionTemplateLiteral',
    16: 'TemplateTail',
    17: 'OpenBraceToken',
    27: 'LessThanToken',
    58: 'EqualsToken',
    59: 'PlusEqualsToken',
    70: 'CaretEqualsToken',
    72: 'BreakKeyword',
    107: 'WithKeyword',
    108: 'ImplementsKeyword',
    116: 'YieldKeyword',
    142: 'OfKeyword',
    143: 'QualifiedName',
    158: 'TypePredicate',
    173: 'LiteralType',
    267: 'JSDocTypeExpression',
    276: 'JSDocTag',
    285: 'JSDocTypeLiteral',
};

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['pos', 'end']),

  loadParser(callback) {
    require(['typescript'], _ts => callback(ts = _ts));
  },

  parse(ts, code, options) {
    options = {...defaultOptions, ...options};

    const compilerHost/*: ts.CompilerHost*/ = {
      fileExists: () => true,
      getCanonicalFileName: filename => filename,
      getCurrentDirectory: () => '',
      getDefaultLibFileName: () => 'lib.d.ts',
      getNewLine: () => '\n',
      getSourceFile: filename => {
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
              comment.type = this.getSyntaxKindName(comment.kind);
              comment.text = sourceFile.text.substring(comment.pos, comment.end);
            });

            return comments;
          }
        }
      }
    };

    return sourceFile;
  },
  
  getSyntaxKindName(kind) {
      return syntaxKindFix[kind] || ts.SyntaxKind[kind];
  },

  getNodeName(node) {
    if (node.kind) {
      return this.getSyntaxKindName(node.kind);
    }
  },

  _ignoredProperties: new Set([
    'constructor',
    'parent',
  ]),

  *forEachProperty(node) {
    for (let prop in node) {
      if (this._ignoredProperties.has(prop) || prop.charAt(0) === '_') {
        continue;
      }
      yield {
        value: node[prop],
        key: prop,
      };
    }
    if (node.parent) {
      yield {
        value: getComments(node),
        key: 'leadingComments',
        computed: true,
      };
      yield {
        value: getComments(node, true),
        key: 'trailingCommments',
        computed: true,
      };
    }
  },

  nodeToRange(node) {
    if (typeof node.getStart === 'function' &&
        typeof node.getEnd === 'function') {
      return [node.getStart(), node.getEnd()];
    } else if (typeof node.pos !== 'undefined' &&
        typeof node.end !== 'undefined') {
      return [node.pos, node.end];
    }
  },

  opensByDefault(node, key) {
    return (
      key === 'statements' ||
      key === 'declarationList' ||
      key === 'declarations'
    );
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
};
