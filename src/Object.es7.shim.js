if (!Object.assign) {
  Object.defineProperty(Object, "assign", {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(target, firstSource) {
      "use strict";
      if (target === undefined || target === null)
    throw new TypeError("Cannot convert first argument to object");

  var to = Object(target);

  var hasPendingException = false;
  var pendingException;

  for (var i = 1; i < arguments.length; i++) {
    var nextSource = arguments[i];
    if (nextSource === undefined || nextSource === null)
    continue;

  var keysArray = Object.keys(Object(nextSource));
  for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
    var nextKey = keysArray[nextIndex];
    try {
      var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
      if (desc !== undefined && desc.enumerable)
        to[nextKey] = nextSource[nextKey];
    } catch (e) {
      if (!hasPendingException) {
        hasPendingException = true;
        pendingException = e;
      }
    }
  }

  if (hasPendingException)
    throw pendingException;
  }
  return to;
    }
  });
}
