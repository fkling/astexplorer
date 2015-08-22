import pkg from 'espree/package.json';

const options = {
    // attach range information to each node
    range: true,

    // create a top-level comments array containing all comments
    comments: true,

    // attach comments to the closest relevant node as leadingComments and
    // trailingComments
    attachComment: true,

    // create a top-level tokens array containing all tokens
    tokens: true,

    // specify parsing features (default only has blockBindings: true)
    // setting this option replaces the default values
    ecmaFeatures: {

        // enable parsing of arrow functions
        arrowFunctions: true,

        // enable parsing of let/const
        blockBindings: true,

        // enable parsing of destructured arrays and objects
        destructuring: true,

        // enable parsing of regular expression y flag
        regexYFlag: true,

        // enable parsing of regular expression u flag
        regexUFlag: true,

        // enable parsing of template strings
        templateStrings: true,

        // enable parsing of binary literals
        binaryLiterals: true,

        // enable parsing of ES6 octal literals
        octalLiterals: true,

        // enable parsing unicode code point escape sequences
        unicodeCodePointEscapes: true,

        // enable parsing of default parameters
        defaultParams: true,

        // enable parsing of rest parameters
        restParams: true,

        // enable parsing of for-of statement
        forOf: true,

        // enable parsing computed object literal properties
        objectLiteralComputedProperties: true,

        // enable parsing of shorthand object literal methods
        objectLiteralShorthandMethods: true,

        // enable parsing of shorthand object literal properties
        objectLiteralShorthandProperties: true,

        // Allow duplicate object literal properties (except '__proto__')
        objectLiteralDuplicateProperties: true,

        // enable parsing of generators/yield
        generators: true,

        // enable parsing spread operator
        spread: true,

        // enable super in functions
        superInFunctions: true,

        // enable parsing classes
        classes: true,

        // enable parsing of new.target
        newTarget: false,

        // enable parsing of modules
        modules: true,

        // enable React JSX parsing
        jsx: true,

        // enable return in global scope
        globalReturn: true,

        // allow experimental object rest/spread
        experimentalObjectRestSpread: true,
    },
};

export default {
  parse(code) {
    return new Promise((resolve, reject) => {
      loadjs(['espree'], parser => {
        try {
          resolve(parser.parse(code, options));
        } catch(error) {
          reject(error);
        }
      }, error => (resolve(null), console.error(error)));
    });
  },

  nodeToRange(node) {
    return node.range;
  },

  version: pkg.version,
  homepage: pkg.homepage,
};
