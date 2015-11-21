import acorn from './acorn';
import babelEslint from './babel-eslint';
import babylon from './babylon';
import babylon6 from './babylon6';
import espree from './espree';
import esprima from './esprima';
import recast from './recast';
import shift from './shift';
import traceur from './traceur';
import typescript from './typescript';

export var parsers = [
  acorn,
  babelEslint,
  babylon,
  babylon6,
  espree,
  esprima,
  recast,
  shift,
  traceur,
  typescript,
];

export function getDefaultParser() {
  return parsers[0];
}

let byID = parsers.reduce(
  (map, parser) => {
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
