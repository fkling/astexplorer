let storage = global.localStorage;
let defaultConfig = {
  parser: null,
  parserSettings: {},
  visualizationSettings: {},
};

let config = storage ?
  JSON.parse(storage.getItem('explorerSettings') || '0') || {} :
  {};

config = Object.assign(defaultConfig, config);

let writeConfig = storage ?
  () => storage.setItem('explorerSettings', JSON.stringify(config)) :
  () => {};

export function getParser() {
  return config.parser;
}

export function setParser(parser) {
  config.parser = parser;
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

export function getVisualizationSettings(visualization) {
  return config.visualizationSettings[visualization] || {};
}
