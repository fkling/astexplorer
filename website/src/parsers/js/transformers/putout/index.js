import compileModule from '../../../utils/compileModule';
import pkg from 'putout/package.json';

const ID = 'putout';
const name = 'putout';

export default {
  id: ID,
  displayName: name,
  version: pkg.version,
  homepage: pkg.homepage,

  defaultParserID: 'babylon7',

  loadTransformer(callback) {
    require(
      ['putout/dist/putout.js'],
      (putout) => callback({ putout })
    );
  },

  transform({ putout }, transformCode, source) {
    const plugin = compileModule(transformCode, {
      require: () => putout,
    });
    
    const { code } = putout(source, {
      plugins: [{
        plugin,
      }],
    });

    return code;
  },
};
