export default {
  _ignoredProperties: new Set(),

  opensByDefault(node, key) {
    return false;
  },

  opensOnDeepOpen(node, key) {
    return true;
  },

  nodeToRange(node) {
    return node.range;
  },

  getNodeName(node) {
    return node.type;
  },

  forEachProperty(node, callback) {
    for (var prop in node) {
      if (this._ignoredProperties.has(prop)) {
        continue;
      }
      var result = callback({
        value: node[prop],
        key: prop,
        computed: false,
      });
      if (result === false) {
        break;
      }
    }
  },
};
