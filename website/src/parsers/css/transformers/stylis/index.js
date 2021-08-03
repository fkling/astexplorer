import compileModule from '../../../utils/compileModule';
import pkg from 'stylis/package.json';

const ID = 'stylis';

export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  defaultParserID: 'stylis',

  loadTransformer(callback) {
    require(['../../../transpilers/babel', 'stylis'], (transpile, stylis) => {
      callback({ transpile: transpile.default, stylis });
    });
  },

  transform({ transpile, stylis }, transformCode, code) {
    transformCode = transpile( transformCode);
    let transform = compileModule( // eslint-disable-line no-shadow
      transformCode,
      {
        require(name) {
          switch (name) {
            case 'stylis': return stylis;
            default: throw new Error(`Cannot find module '${name}'`);
          }
        },
      },
    );
    return stylis.serialize(stylis.compile(code), stylis.middleware([].concat(transform.default || transform).concat(stylis.stringify)));
  },
};
