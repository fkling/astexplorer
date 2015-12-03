import compileModule from '../utils/compileModule';
import pkg from 'jscodeshift/package.json';
import defaultTransform from './transformJscodeshift.txt';

const ID = 'jscodeshift';

export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  defaultParser: {
    id: 'recast',
  },

  defaultTransform,

  loadTransformer(callback) {
    require(['jscodeshift', 'babel-core'], (jscodeshift, babel) => {
      callback({ jscodeshift, babel });
    });
  },

  transform({ jscodeshift, babel }, transformCode, code) {
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
