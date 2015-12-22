import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'typescript/package.json';
import SettingsRenderer from '../utils/SettingsRenderer';
import * as LocalStorage from '../../LocalStorage';

const ID = 'typescript';
const FILENAME = 'astExplorer.ts';
const options = {
  experimentalDecorators: true,
  experimentalAsyncFunctions: true,
  jsx: true,
  ...LocalStorage.getParserSettings(ID),
};

const settings = [
  'experimentalDecorators',
  'experimentalAsyncFunctions',
  'jsx',
];

const changeOption = (name, {target}) => {
  options[name] = target.checked;
  LocalStorage.setParserSettings(ID, options);
};

let ts;
let getComments;

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: ['pos', 'end'],

  loadParser(callback) {
    require(['typescript'], _ts => callback(ts = _ts));
  },

  parse(ts, code) {
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

            return comments;
          }
        }
      }
    };

    return sourceFile;
  },

  getNodeName(node) {
    if (node.kind) {
      return ts.SyntaxKind[node.kind]
    }
  },

  *forEachProperty(node) {
    for (let prop in node) {
      if (
        prop === 'constructor' ||
        prop.charAt(0) === '_'
      ) {
        continue;
      }
      yield {
        value: node[prop],
        key: prop,
      };
    }
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
  },

  nodeToRange(node) {
    if (typeof node.getStart === 'function' && typeof node.getEnd === 'function') {
      return [node.getStart(), node.getEnd()];
    } else if (typeof node.pos !== 'undefined' && typeof node.end !== 'undefined') {
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

  renderSettings() {
    return SettingsRenderer({
      settings,
      values: options,
      onChange: changeOption,
    });
  },
};
