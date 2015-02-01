"use strict";

var isArray = require('./isArray');

function isInRange(range, pos) {
  return pos >= range[0] && pos <= range[1];
}

function getFocusPath(node, pos, path) {
  path = path || [];

  if (node.range) {
    if (isInRange(node.range, pos)) {
      path.push(node);
    }
    else {
      return [];
    }
  }
  else if (isArray(node) && node.length > 0) {
    // check first and last child
    if (isInRange([node[0].range[0], node[node.length - 1].range[1]], pos)) {
      path.push(node);
    }
    else {
      return [];
    }
  }
  for (var prop in node) {
    if (prop !== 'range' && node[prop] && typeof node[prop] === 'object') {
      var childPath = getFocusPath(node[prop], pos);
      if (childPath.length > 0) {
        path.push.apply(path, childPath);
        break;
      }
    }
  }
  return path;
}

module.exports = getFocusPath;
