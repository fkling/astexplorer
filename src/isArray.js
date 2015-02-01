"use strict";

function isArray(v) {
  return Object.prototype.toString.call(v) === '[object Array]';
}

module.exports = isArray;
