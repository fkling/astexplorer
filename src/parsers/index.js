import esprima from './esprima';
import espree from './espree';
import acorn from './acorn';
import babylon from './babylon';
import recast from './recast';
import shift from './shift';
import babelEslint from './babel-eslint';

export var parsers = [
  acorn,
  babelEslint,
  babylon,
  espree,
  esprima,
  recast,
  shift,
];

export function getDefaultParser() {
  return parsers[0];
}

let byID = Object.keys(parsers).reduce(
  (map, name) => {
    let parser = parsers[name];
    map[parser.id] = parser;
    return map;
  },
  {}
);

export function getParserByID(id) {
  return byID[id];
}

export function getParser(idOrObject) {
  let parserID = idOrObject && typeof idOrObject === 'object' ?
    idOrObject.id :
    idOrObject;
  return parserID ? getParserByID(parserID) : null;
}
