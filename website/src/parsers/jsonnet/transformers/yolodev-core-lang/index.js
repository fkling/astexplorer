//import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'jsonnet-astexplorer/package.json';

const ID = 'yolodev-jsonnet-core-lang';

export default {
  id: ID,
  displayName: 'yolodev-core-lang',
  version: pkg.version,
  defaultParserID: 'yolodev-jsonnet',

  loadTransformer(callback) {
    require(['jsonnet-astexplorer'], callback);
  },

  transform(jsonnet, transformCode, code) {
    return jsonnet.desugar(code);
  },
};
