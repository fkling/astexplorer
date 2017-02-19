import defaultESTreeParserInterface from '../../utils/defaultESTreeParserInterface';
import compileModule from '../../utils/compileModule';
import pkg from 'jscodeshift/package.json';
import jscodeshift from 'jscodeshift';
import recast from 'jscodeshift:recast';
import babel from 'jscodeshift:babel-core';
import * as category from '../../categories/js';
import codeExample from '../../categories/js/codeExample.txt';
import transformExample from './transformExample.txt';

const ID = 'jscodeshift';

const sessionMethods = new Set();
let patched;

export default {
  ...defaultESTreeParserInterface,

  id: `${ID}@${pkg.version}`,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage || 'https://github.com/facebook/jscodeshift',
  category,
  codeExample,
  transformExample,

  load() {
    if (!patched) {
      const { registerMethods } = jscodeshift;

      let origMethods;

      jscodeshift.registerMethods({
        hasOwnProperty(name) {
          // compare only against current-session & very original methods
          if (!origMethods) {
            origMethods = new Set(Object.getOwnPropertyNames(this));
          }
          return origMethods.has(name) || sessionMethods.has(name);
        },
      });

      // patch in order to collect user-defined method names
      jscodeshift.registerMethods = function (methods) {
        registerMethods.apply(this, arguments);
        for (let name in methods) {
          sessionMethods.add(name);
        }
      };
      patched = true;
    }
    return Promise.resolve({jscodeshift, recast});
  },

  parse({recast}, code) {
    return recast.parse(code, {esprima: babel});
  },

  _ignoredProperties: new Set(['__clone']),

  *forEachProperty(node) {
    for (let prop in node) {
      if (
        this._ignoredProperties.has(prop) || typeof node[prop] === 'function'
      ) {
        continue;
      }
      yield {
        value: node[prop],
        key: prop,
        computed: false,
      };
    }
  },

  nodeToRange(node) {
    if (typeof node.start === 'number') {
      return [node.start, node.end];
    }
    return node.range;
  },

  transform(
    {jscodeshift},
    transformCode,
    code
  ) {
    sessionMethods.clear();
    const transformModule = compileModule( // eslint-disable-line no-shadow
      transformCode
    );
    const transform = transformModule.__esModule ?
      transformModule.default :
      transformModule;

    const counter = Object.create(null);
    let statsWasCalled = false;

    const result = transform(
      {
        path: 'Live.js',
        source: code,
      },
      {
        jscodeshift,
        stats: (value, quantity=1) => {
          statsWasCalled = true;
          counter[value] = (counter[value] ? counter[value] : 0) + quantity;
        },
      },
      {}
    );
    if (statsWasCalled) {
      console.log(JSON.stringify(counter, null, 4)); // eslint-disable-line no-console
    }
    if (result == null) {
      // If null is returned, the jscodeshift runner won't touch the original
      // code, so we just return that.
      return code;
    } else if (typeof result !== 'string') {
      throw new Error(
        'Transformers must either return undefined, null or a string, not ' +
        `"${typeof result}".`
      );
    }
    return result;
  },
};
