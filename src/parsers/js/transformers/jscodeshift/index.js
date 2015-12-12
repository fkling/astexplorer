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
    require(['jscodeshift', 'babel-core'], (jscodeshift, babel) => {
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

      callback({ jscodeshift, babel });
    });
  },

  transform({ jscodeshift, babel }, transformCode, code) {
    sessionMethods.clear();
    let transform = compileModule( // eslint-disable-line no-shadow
      babel.transform(transformCode).code
    );
    return transform(
      {
        path: 'Live.js',
        source: code,
      },
      { jscodeshift },
      {}
    );
  },
};
