function isInRange(range, pos) {
  return pos >= range[0] && pos <= range[1];
}

export default function getFocusPath(node, pos, parser, seen = new Set()) {
  seen.add(node);

  let path = [];
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
  parser.forEachProperty(
    node,
    ({value}) => {
      if (value && typeof value === 'object' && !seen.has(value)) {
        var childPath = getFocusPath(value, pos, parser, seen);
        if (childPath.length > 0) {
          path.push(...childPath);
          return false;
        }
      }
    }
  );
  return path;
}
