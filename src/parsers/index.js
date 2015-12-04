import * as js from './js';
import * as css from './css';

export const categories = [
  js,
  css,
];

export function getDefaultCategory() {
  return categories[0];
}

export function getDefaultParser(category = getDefaultCategory()) {
  return category.parsers[0];
}

let categoryByID = {};
let parserByID = {};

categories.forEach(category => {
  categoryByID[category.id] = category;
  category.parsers.forEach(parser => {
    parser.category = category;
    parserByID[parser.id] = parser;
  });
});

export function getCategoryByID(id) {
  return categoryByID[id];
}

export function getParserByID(id) {
  return parserByID[id];
}
