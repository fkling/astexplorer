import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'typescript/package.json';

const ID = 'typescript';
const FILENAME = 'astExplorer.ts';

let getComments;
const syntaxKind = {};

// Typescript uses `process` somehow
if (!global.process) {
  global.process = {}
}

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['pos', 'end']),
  typeProps: new Set(['kind']),

  loadParser(callback) {
    require(['typescript'], _ts => {
        // workarounds issue described at https://github.com/Microsoft/TypeScript/issues/18062
        for (const name of Object.keys(_ts.SyntaxKind).filter(x => isNaN(parseInt(x)))) {
            const value = _ts.SyntaxKind[name];
            if (!syntaxKind[value]) {
                syntaxKind[value] = name;
            }
        }

        callback(_ts);
    });
  },

  parse(ts, code, options) {
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
