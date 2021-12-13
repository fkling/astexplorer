import defaultParserInterface from '../../utils/defaultParserInterface';

export default (pkg) => ({
  ...defaultParserInterface,
  id: pkg.name+pkg.version,
  displayName: pkg.name+'@'+pkg.version,
  version: '',  
  locationProps: new Set(['positions','position']),
  homepage: "https://www.npmjs.com/package/@atlassianlabs/jql-ast",

  parse(jqlParser, code) {
    return new jqlParser.JastBuilder().build(code);
  },

  opensByDefault(node, key) {
    return key === 'query';
  },

  getNodeName(node) {
    return node.type;
  },

  nodeToRange({ position }) {
    if (!position) {
      return;
    }
    return [position[0], position[1]];
  },
});
