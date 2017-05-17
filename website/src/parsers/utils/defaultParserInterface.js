export default {
  showInMenu: true,
  _ignoredProperties: new Set(),
  locationProps: new Set(),

  opensByDefault(/*node, key*/) {
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
