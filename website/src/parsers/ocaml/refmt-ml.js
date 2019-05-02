import config from '../reason/refmt';

const ID = 'refmt-ml';

export default {
  ...config,
  id: ID,
  parse: function(parser, code) {
    return parser.parseOcaml(code);
  },
};
