"use strict";

function isInRange(range, pos) {
  return range[0] >= pos && range[1] <= pos;
}

function getFocusPath(node, pos, path) {
  path = path || [];
  var nodePushed = false;

  if (node.range) {
    if (isInRange(node.range, pos)) {
      path.push(node);
      nodePushed = true;
    }
    else {
      return [];
    }
  }
  for (var prop in node) {
    if (prop !== 'loc' && node[prop] && typeof node[prop] === 'object') {
      var childPath = getFocusPath(node[prop], focus);
      if (childPath.length > 0) {
        if (!nodePushed) {
          path.push(node);
        }
        path.push.apply(path, childPath);
        break;
      }
    }
  }
  return path;
}

module.exports = getFocusPath;
