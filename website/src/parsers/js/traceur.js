import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'traceur/package.json';

const ID = 'traceur';
const FILENAME = 'astExplorer.js';

class Comment {
  constructor(sourceRange) {
    this.type = 'COMMENT';
    Object.defineProperty(this, 'location', { value: sourceRange });
    this.value = sourceRange.toString();
  }
}

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['location']),

  loadParser(callback) {
    require(['exports-loader?traceur!traceur/bin/traceur'], callback);
  },

  parse(traceur, code, options) {
    let sourceFile = new traceur.syntax.SourceFile(FILENAME, code);
    let errorReporter = new traceur.util.ErrorReporter();
    errorReporter.reportMessageInternal = (sourceRange, message) => {
      if (options.TolerateErrors) {
        return;
      }
      let { start, end } = sourceRange;
      if (start.offset < end.offset) {
        message += `: ${sourceRange}`;
      }
      let err = new SyntaxError(message);
      err.lineNumber = start.line + 1;
      err.columnNumber = start.column;
      throw err;
    };
    let parser = new traceur.syntax.Parser(
      sourceFile,
      errorReporter,
      new traceur.util.Options(options),
    );
    let comments = [];
    parser.handleComment = sourceRange => {
      comments.push(new Comment(sourceRange));
    };
    let ast = options.SourceType === 'Script' ?
      parser.parseScript() :
      parser.parseModule();
    ast.comments = comments;
    return ast;
  },

  getNodeName(node) {
    return node.constructor.name;
  },

  *forEachProperty(node) {
    if (node && typeof node === 'object') {
      if ('type' in node) {
        yield {
          value: node.type,
          key: 'type',
        }
      }
      for (let prop in node) {
        if (prop === 'line_' || prop === 'column_') {
          prop = prop.slice(0, -1);
        }
        if (prop === 'type' || prop === 'lineNumberTable') {
          continue;
        }
        yield {
          value: node[prop],
          key: prop,
        }
      }
    }
  },

  nodeToRange({ location: loc }) {
    if (loc) {
      return [loc.start.offset, loc.end.offset];
    }
  },

  opensByDefault(node, key) {
    return (
      key === 'scriptItemList' ||
      key === 'declarations' ||
      key === 'statements' ||
      key === 'parameters' ||
      Array.isArray(node) && key === 'args' ||
      key === 'binding' ||
      key === 'expression' ||
      key === 'expressions' ||
      key === 'literalToken' ||
      key === 'identifierToken'
    );
  },

  getDefaultOptions() {
    return {
      SourceType: 'Module',
      TolerateErrors: false,
      commentCallback: true,
      annotations: false,
      arrayComprehension: false,
      arrowFunctions: true,
      asyncFunctions: false,
      asyncGenerators: false,
      blockBinding: true,
      classes: true,
      computedPropertyNames: true,
      destructuring: true,
      exponentiation: false,
      exportFromExtended: false,
      forOf: true,
      forOn: false,
      generatorComprehension: false,
      generators: true,
      jsx: true,
      memberVariables: false,
      numericLiterals: true,
      propertyMethods: true,
      propertyNameShorthand: true,
      restParameters: true,
      spread: true,
      templateLiterals: true,
      types: false,
      unicodeEscapeSequences: true,
    };
  },

  _getSettingsConfiguration(defaultOptions) {
    return {
      fields :[
        ['SourceType', ['Script', 'Module']],
        ...Object.keys(defaultOptions).filter(x => x !== 'SourceType'),
      ],
    };
  },
};
