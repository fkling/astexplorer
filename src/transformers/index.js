import jscodeshift from './jscodeshift';
import babel from './babel';

export let transformers = [
  jscodeshift,
  babel,
];

let byID = transformers.reduce(
  (map, tool) => {
    map[tool.id] = tool;
    return map;
  },
  {}
);

export function getTransformerByID(id) {
  return byID[id];
}
