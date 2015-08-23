let storage = global.localStorage;
let defaultConfig = {
  parser: null,
  parserSettings: {},
};

let config = storage ?
  JSON.parse(storage.getItem('explorerSettings') || '0') || defaultConfig :
  defaultConfig;

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
