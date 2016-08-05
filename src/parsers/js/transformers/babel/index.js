import compileModule from '../../../utils/compileModule';
import pkg from 'babel-core/package.json';

const ID = 'babel';

const options = {
  stage: 0,
};

export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  defaultParserID: 'babylon',

  loadTransformer(callback) {
    require(['babel5'], callback);
  },

  transform(babel, transformCode, code) {
    let transform = compileModule( // eslint-disable-line no-shadow
      transformCode
    );

    return babel.transform(code, {
      whitelist: [],
      plugins: [transform.default || transform],
      sourceMaps: true,
    });
  },
};
