export default {
  _ignoredProperties: new Set(),

  opensByDefault(node, key) {
    return false;
  },

  nodeToRange(node) {
    return node.range;
  },

  getNodeName(node) {
    return node.type;
  },

  *forEachProperty(node) {
    for (let prop in node) {
      if (this._ignoredProperties.has(prop)) {
        continue;
      }
      yield {
        value: node[prop],
        key: prop,
        computed: false,
      }
    }
  },
};
