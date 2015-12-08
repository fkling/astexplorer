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
    require(['postcss', 'babel-core'], (postcss, babel) => {
      callback({ postcss, babel });
    });
  },

  transform({ postcss, babel }, transformCode, code) {
    let transform = compileModule( // eslint-disable-line no-shadow
      babel.transform(transformCode).code,
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
