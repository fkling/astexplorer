import compileModule from '../../../utils/compileModule';
import pkg from 'ember-template-recast/package.json';

const ID = 'ember-template-recast';

export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage || 'https://github.com/ember-template-lint/ember-template-recast',

  defaultParserID: 'ember-template-recast',

  loadTransformer(callback) {
    require(
      ['../../../transpilers/babel', 'ember-template-recast'],
      (transpile, recast) => callback({ transpile: transpile.default, recast }),
    );
  },

  transform({ transpile, recast }, transformCode, code) {
    transformCode = transpile(transformCode);
    const transformModule = compileModule(transformCode);

    // allow "export default" instead of "module.exports = "
    const transform = transformModule.__esModule ?
      transformModule.default :
      transformModule;

    return recast.transform(code, transform).code;
  },
};
