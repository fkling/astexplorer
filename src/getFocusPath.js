"use strict";

function isInRange(loc, focus) {
  return loc.start.line < focus.line &&
         loc.end.line > focus.line ||
         loc.start.line === focus.line &&
         loc.end.line !== focus.line &&
         loc.start.column <= focus.column ||
         loc.start.line !== focus.line &&
         loc.end.line === focus.line &&
         loc.end.column >= focus.column ||
         loc.start.line === focus.line &&
         loc.end.line === focus.line &&
         loc.start.column <= focus.column &&
         loc.end.column >= focus.column;
}

function getFocusPath(node, focus, path) {
  path = path || [];
  var nodePushed = false;

  if (node.loc) {
    if (isInRange(node.loc, focus)) {
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
