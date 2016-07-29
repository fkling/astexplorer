import compileModule from '../../../utils/compileModule';
import pkg from 'jscodeshift/package.json';

const ID = 'jscodeshift';

const sessionMethods = new Set();

export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  defaultParserID: 'recast',

  loadTransformer(callback) {
    require(
      [
        'jscodeshift',
        'babel6',
        'babel-preset-stage-1',
        'babel-preset-es2015',
        'babel-plugin-transform-flow-strip-types',
      ],
      (jscodeshift, babel, presetStage1, presetES2015, flowStripTypes) => {
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

        callback({
          jscodeshift,
          babel,
          options: {
            presets: [presetStage1, presetES2015],
            plugins: [flowStripTypes],
          },
        });
      }
    );
  },

  transform(
    {jscodeshift, babel, options},
    transformCode,
    code
  ) {
    sessionMethods.clear();
    const transformModule = compileModule( // eslint-disable-line no-shadow
      babel.transform(transformCode, options).code
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
