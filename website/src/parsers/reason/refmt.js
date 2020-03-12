import defaultParserInterface from '../utils/defaultParserInterface';
import esyPkg from 'astexplorer-refmt/esy.json';
import CodeMirror from 'codemirror';
import addCodeMirrorMode from './codeMirrorMode';

addCodeMirrorMode(CodeMirror);

const ID = 'refmt';
const locKeys = [
  'loc',
  'pcd_loc',
  'pcf_loc',
  'pci_loc',
  'pcl_loc',
  'pctf_loc',
  'pcty_loc',
  'pexp_loc',
  'pext_loc',
  'pincl_loc',
  'pld_loc',
  'pmb_loc',
  'pmd_loc',
  'pmod_loc',
  'pmtd_loc',
  'pmty_loc',
  'popen_loc',
  'ppat_loc',
  'psig_loc',
  'pstr_loc',
  'ptyp_loc',
  'ptype_loc',
  'pval_loc',
  'pvb_loc',
];
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
    return parser.parseReason(code);
  },

  getNodeName(node) {
    return node.type;
  },

  nodeToRange(node) {
    const locKey = locKeys.find(key => Object.prototype.hasOwnProperty.call(node, key));
    if (locKey) {
      const range = [
        node[locKey].loc_start.pos_cnum,
        node[locKey].loc_end.pos_cnum,
      ];
      return range;
    }
  },
};
