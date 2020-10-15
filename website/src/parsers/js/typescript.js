import defaultParserInterface from '../utils/defaultParserInterface';
import {loadParser} from '../../parser-loader.js';

const ID = 'typescript';
const FILENAME = 'astExplorer.ts';

let getComments;
let syntaxKind = {};

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  homepage: 'https://www.typescriptlang.org/',
  locationProps: new Set(['pos', 'end']),
  typeProps: new Set(['kind']),

  loadParser() {
    return loadParser('typescript@3')
      .then(response => {
        syntaxKind = response.syntaxKind;
        return response;
      });
  },

  parse({typescript: ts}, code, options) {
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
              comment.type = syntaxKind[comment.kind];
              comment.text = sourceFile.text.substring(comment.pos, comment.end);
            });

            return comments;
          }
        }
      }
    };

    return sourceFile;
  },

  getNodeName(node) {
    if (node.kind) {
      return syntaxKind[node.kind];
    }
  },

  _ignoredProperties: new Set([
    'file',
    'parent',
  ]),

  *forEachProperty(node) {
    if (node && typeof node === 'object') {
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
          key: 'trailingComments',
          computed: true,
        };
      }
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

  opensByDefault(_, key) {
    return (
      key === 'statements' ||
      key === 'declarationList' ||
      key === 'declarations'
    );
  },

  getDefaultOptions() {
    return {
      experimentalDecorators: true,
      jsx: true,
    };
  },

};
