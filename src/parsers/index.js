import esprima from './esprima';
import espree from './espree';
import acorn from './acorn';
import babylon from './babylon';
import recast from './recast';

export var parsers = [
  esprima,
  espree,
  acorn,
  babylon,
  recast,
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
  let parserID = typeof idOrObject === 'string' ? idOrObject : idOrObject.id;
  return getParserByID(parserID);
}
