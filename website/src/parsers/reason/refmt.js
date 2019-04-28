import defaultParserInterface from '../utils/defaultParserInterface';
import esyPkg from 'astexplorer-refmt/esy.json';

const ID = 'refmt';
const locKeys = ['pstr_loc', 'pexp_loc', 'pvb_loc', 'ppat_loc'];
const parserVersion = esyPkg.dependencies['@esy-ocaml/reason'];

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: parserVersion,
  homepage: `https://www.npmjs.com/package/@esy-ocaml/reason/v/${parserVersion}`,
  locationProps: new Set(locKeys),

  loadParser(callback) {
    require(['astexplorer-refmt'], callback);
  },

  parse(parser, code) {
    return parser.parse(code);
  },

  getNodeName(node) {
    return node.type;
  },

  nodeToRange(node) {
    const locKey = locKeys.find(key => node.hasOwnProperty(key));
    if (locKey) {
      const range = [
        node[locKey].loc_start.pos_cnum,
        node[locKey].loc_end.pos_cnum,
      ];
      return range;
    }
  },
};
