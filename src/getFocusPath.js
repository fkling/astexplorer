function isInRange(range, pos) {
  return pos >= range[0] && pos <= range[1];
}

export default function getFocusPath(node, pos, parser, path) {
  if (parser.id === 'cst') { return []; }
  path = path || [];
  let range = parser.nodeToRange(node);
  if (range) {
    if (isInRange(range, pos)) {
      path.push(node);
    }
    else {
      return [];
    }
  }
  else if (Array.isArray(node) && node.length > 0) {
    // check first and last child
    let rangeFirst = parser.nodeToRange(node[0]);
    let rangeLast = parser.nodeToRange(node[node.length - 1]);
    if (rangeFirst && rangeLast) {
      if (isInRange([rangeFirst[0], rangeLast[1]], pos)) {
        path.push(node);
      }
      else {
        return [];
      }
    }
  }
  for (var prop in node) {
    if (prop !== 'range' && prop !== 'loc' &&
        node[prop] && typeof node[prop] === 'object') {
      var childPath = getFocusPath(node[prop], pos, parser);
      if (childPath.length > 0) {
        path.push(...childPath);
        break;
      }
    }
  }
  return path;
}
