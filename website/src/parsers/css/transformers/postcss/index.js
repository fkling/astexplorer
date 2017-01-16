import compileModule from '../../../utils/compileModule';
import pkg from 'postcss/package.json';

const ID = 'postcss';

export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  defaultParserID: 'postcss',

  loadTransformer(callback) {
    require(['postcss'], postcss => {
      callback({ postcss });
    });
  },

  transform({ postcss }, transformCode, code) {
    let transform = compileModule( // eslint-disable-line no-shadow
      transformCode,
      {
        require(name) {
          switch (name) {
            case 'postcss': return postcss;
            default: throw new Error(`Cannot find module '${name}'`);
          }
        },
      }
    );
    return postcss([ (transform.default || transform)() ]).process(code).css;
  },
};
