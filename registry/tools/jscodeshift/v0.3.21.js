import base from './base';
import pkg from 'jscodeshift/package.json';
import jscodeshift from 'jscodeshift';
import recast from 'jscodeshift:recast';
import getParser from 'jscodeshift/dist/getParser';

const ID = 'jscodeshift';

export default {
  ...base,

  id: `${ID}@${pkg.version}`,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage || 'https://github.com/facebook/jscodeshift',

  load() {
    return Promise.resolve({jscodeshift, recast});
  },

  parse({recast}, code) {
    return recast.parse(code, {parser: getParser()});
  },

};
