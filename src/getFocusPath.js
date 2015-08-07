import getSourceLocationFromASTNode from './getSourceLocationFromASTNode';

function isInRange(range, pos) {
  return pos >= range[0] && pos <= range[1];
}

export default function getFocusPath(node, pos, path) {
  path = path || [];
  let range = getSourceLocationFromASTNode(node);

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
    let rangeFirst = getSourceLocationFromASTNode(node[0]);
    let rangeLast = getSourceLocationFromASTNode(node[node.length - 1]);
    if (isInRange([rangeFirst[0], rangeLast[1]], pos)) {
      path.push(node);
    }
    else {
      return [];
    }
  }
  for (var prop in node) {
    if (prop !== 'range' && prop !== 'loc' &&
        node[prop] && typeof node[prop] === 'object') {
      var childPath = getFocusPath(node[prop], pos);
      if (childPath.length > 0) {
        path.push(...childPath);
        break;
      }
    }
  }
  return path;
}
