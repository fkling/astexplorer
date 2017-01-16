function isInRange(range, pos) {
  return pos >= range[0] && pos <= range[1];
}

export function nodeToRange(parser, node) {
  let range = parser.nodeToRange(node);
  if (range) {
    return range;
  }
  if (node.length > 0) {
    // check first and last child
    let rangeFirst = node[0] && parser.nodeToRange(node[0]);
    let rangeLast = node[node.length - 1] &&
      parser.nodeToRange(node[node.length - 1]);
    if (rangeFirst && rangeLast) {
      return [rangeFirst[0], rangeLast[1]];
    }
  }
}

export default function getFocusPath(node, pos, parser, seen = new Set()) {
  seen.add(node);

  let path = [];
  let range = nodeToRange(parser, node);
  if (range) {
    if (isInRange(range, pos)) {
      path.push(node);
    } else {
      return [];
    }
  }
  for (let {value} of parser.forEachProperty(node)) {
    if (value && typeof value === 'object' && !seen.has(value)) {
      let childPath = getFocusPath(value, pos, parser, seen);
      if (childPath.length > 0) {
        path = path.concat(childPath);
        break;
      }
    }
  }
  return path;
}
