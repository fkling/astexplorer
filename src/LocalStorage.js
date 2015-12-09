let storage = global.localStorage;
let defaultConfig = {
  parser: {},
  parserSettings: {},
  visualizationSettings: {},
  category: 'javascript',
};

let config = storage ?
  JSON.parse(storage.getItem('explorerSettings') || '0') || {} :
  {};

config = Object.assign(defaultConfig, config);

let writeConfig = storage ?
  () => storage.setItem('explorerSettings', JSON.stringify(config)) :
  () => {};

// Upgrade local storage
// Since the introduction of categories, we save the last used parser per
// category.
const parser = config.parser;
if (parser == null || typeof parser === 'string') {
  config.parser = {};
  writeConfig();
}

export function getParser(category) {
  return config.parser[category || getCategory()];
}

export function setParser(parser) {
  config.parser[parser.category.id] = parser.id;
  writeConfig();
}

export function getCategory() {
  return config.category;
}

export function setCategory(category) {
  config.category = category;
  writeConfig();
}

export function getParserSettings(parser) {
  return config.parserSettings[parser] || {};
}

export function setParserSettings(parser, settings) {
  config.parserSettings[parser] = settings;
  writeConfig();
}

export function setVisualizationSettings(visualization, settings) {
  config.visualizationSettings[visualization] = settings;
  writeConfig();
}

export function getVisualizationSettings(visualization, def) {
  return config.visualizationSettings[visualization] || def || {};
}
