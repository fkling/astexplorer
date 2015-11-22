import defaultParserInterface from './utils/defaultParserInterface';
import pkg from 'traceur/package.json';
import SettingsRenderer from './utils/SettingsRenderer';
import * as LocalStorage from '../LocalStorage';

const ID = 'traceur';
const FILENAME = 'astExplorer.js';

const parseOptionsDefaults = {
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
    // jsx: false, - master branch, uncomment in upcoming version
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

const options = Object.assign(
  {
    SourceType: 'Script',
    TolerateErrors: false,
    commentCallback: true,
    ...parseOptionsDefaults,
  },
  LocalStorage.getParserSettings(ID)
);

const settings = [
  ['SourceType', ['script', 'module']],
  'TolerateErrors',
  ...Object.keys(parseOptionsDefaults),
];

const changeOption = (name, {target}) => {
  options[name] = name === 'SourceType' ? target.value : target.checked;
  LocalStorage.setParserSettings(ID, options);
};

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  parse(code) {
    return new Promise((resolve, reject) => {
      require.ensure(['traceur/bin/traceur'], require => {
        try {
          require('traceur/bin/traceur');
          /*global traceur*/
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
            new traceur.util.Options(options)
          );
          let comments = [];
          parser.handleComment = sourceRange => {
            comments.push({
              comment_: sourceRange.toString(),
              start: sourceRange.start,
              end: sourceRange.end,
            });
          };
          let ast = options.SourceType === 'Script' ?
            parser.parseScript() :
            parser.parseModule();
          ast.comments = comments;
          resolve(ast);
        } catch(err) {
          reject(err);
        }
      });
    });
  },

  getNodeName(node) {
    return node.comment_ || node.constructor.name;
  },

  forEachProperty(node, callback) {
    if ('type' in node) {
      var result = callback({
        value: node.type,
        key: 'type',
      });
      if (result === false) {
        return;
      }
    }
    for (var prop in node) {
      if (prop === 'line_' || prop === 'column_') {
        prop = prop.slice(0, -1);
      }
      if (prop === 'type' || prop === 'lineNumberTable' || prop === 'comment_') {
        continue;
      }
      result = callback({
        value: node[prop],
        key: prop,
      });
      if (result === false) {
        break;
      }
    }
  },

  nodeToRange(node) {
    let loc = node.comment_ ? node : node.location;
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

  renderSettings() {
    return SettingsRenderer({
      settings,
      values: options,
      onChange: changeOption,
    });
  },
};
