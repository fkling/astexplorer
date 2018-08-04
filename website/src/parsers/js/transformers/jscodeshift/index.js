import compileModule from '../../../utils/compileModule';
import pkg from 'jscodeshift/package.json';

const ID = 'jscodeshift';

const sessionMethods = new Set();

async function fetchTypings(path) {
  return await fetch(path).then(r => r.text());
}

export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage || 'https://github.com/facebook/jscodeshift',

  defaultParserID: 'recast',

  loadTypings: async (callback) => {
    const ts = await fetchTypings(require('typescript/lib/typescript.d.ts'));
    const jscodeshift = await fetchTypings(require('../../../../defs/jscodeshift.d.ts'));

    callback([
      {
        text: ts,
        name: './typescript.d.ts',
      },
      {
        text: jscodeshift,
        name: './jscodeshift.d.ts',
      },
      {
        text: `
        import * as ts from './typescript';
        export = ts;
        export as namespace typescript;
      `,
        name: 'global.d.ts',
      },
    ]);
  },

  loadTransformer(callback) {
    require(['jscodeshift', 'typescript', 'babylon7', 'recast'], (jscodeshift, typescript, babylon, recast) => {
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

        callback({jscodeshift, typescript, babylon, recast});
      }
    );
  },

  transform(
    {jscodeshift, typescript, babylon, recast},
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
          typescript,
          babylon,
          recast,
        jscodeshift: transformModule.parser ?
          jscodeshift.withParser(transformModule.parser) :
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
