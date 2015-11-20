import jscodeshift from './jscodeshift';
import babel from './babel';
import babel6 from './babel6';

export let transformers = [
  jscodeshift,
  babel,
  babel6,
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
