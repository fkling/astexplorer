export const SET_ERROR = 'SET_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const LOAD_SNIPPET = 'LOAD_SNIPPET';
export const START_LOADING_SNIPPET = 'START_LOADING_SNIPPET';
export const DONE_LOADING_SNIPPET = 'DONE_LOADING_SNIPPET';
export const CLEAR_SNIPPET = 'CLEAR_SNIPPET';
export const SELECT_CATEGORY = 'CHANGE_CATEGORY';
export const SELECT_TRANSFORMER = 'SELECT_TRANSFORMER';
export const HIDE_TRANSFORMER = 'HIDE_TRANSFORMER';
export const SET_TRANSFORM = 'SET_TRANSFORM';
export const SET_TRANSFORM_RESULT = 'SET_TRANSFORM_RESULT';
export const SET_PARSER = 'SET_PARSER';
export const SET_PARSER_SETTINGS = 'SET_PARSER_SETTINGS';
export const SET_PARSE_RESULT = 'SET_PARSE_RESULT';
export const SET_SNIPPET = 'SET_SNIPPET';
export const OPEN_SETTINGS_DIALOG = 'OPEN_SETTINGS_DIALOG';
export const CLOSE_SETTINGS_DIALOG = 'CLOSE_SETTINGS_DIALOG';
export const EXPAND_SETTINGS_DRAWER = 'EXPAND_SETTINGS_DRAWER';
export const COLLAPSE_SETTINGS_DRAWER = 'COLLAPSE_SETTINGS_DRAWER';
export const OPEN_SHARE_DIALOG = 'OPEN_SHARE_DIALOG';
export const CLOSE_SHARE_DIALOG = 'CLOSE_SHARE_DIALOG';
export const SET_CODE = 'SET_CODE';
export const SET_CURSOR = 'SET_CURSOR';
export const DROP_TEXT = 'DROP_TEXT';
export const SAVE = 'SAVE';
export const START_SAVE = 'START_SAVE';
export const END_SAVE = 'END_SAVE';
export const RESET = 'RESET';
export const TOGGLE_FORMATTING = 'TOGGLE_FORMATTING';
export const SET_KEY_MAP = 'SET_KEY_MAP';

export function setParser(parser) {
  return {type: SET_PARSER, parser};
}

export function setParserSettings(settings) {
  return {type: SET_PARSER_SETTINGS, settings};
}

export function save(fork=false) {
  return {type: SAVE, fork};
}

export function startSave(fork) {
  return {type: START_SAVE, fork};
}

export function endSave(fork) {
  return {type: END_SAVE, fork};
}

export function setSnippet(revision) {
  return {type: SET_SNIPPET, revision};
}

export function selectCategory(category) {
  return {type: SELECT_CATEGORY, category};
}

export function clearSnippet() {
  return {type: CLEAR_SNIPPET};
}

export function startLoadingSnippet() {
  return {type: START_LOADING_SNIPPET};
}

export function doneLoadingSnippet() {
  return {type: DONE_LOADING_SNIPPET};
}

export function loadSnippet() {
  return {type: LOAD_SNIPPET};
}

export function openSettingsDialog() {
  return {type: OPEN_SETTINGS_DIALOG};
}

export function closeSettingsDialog() {
  return {type: CLOSE_SETTINGS_DIALOG};
}

export function expandSettingsDrawer() {
  return {type: EXPAND_SETTINGS_DRAWER};
}

export function collapseSettingsDrawer() {
  return {type: COLLAPSE_SETTINGS_DRAWER};
}

export function openShareDialog() {
  return {type: OPEN_SHARE_DIALOG};
}

export function closeShareDialog() {
  return {type: CLOSE_SHARE_DIALOG};
}

export function setError(error) {
  return {type: SET_ERROR, error};
}

export function clearError() {
  return {type: CLEAR_ERROR};
}

export function selectTransformer(transformer) {
  return {type: SELECT_TRANSFORMER, transformer};
}

export function hideTransformer() {
  return {type: HIDE_TRANSFORMER};
}

export function setTransformState(state) {
  return {type: SET_TRANSFORM, ...state};
}

export function setCode(state) {
  return {type: SET_CODE, ...state};
}

export function setCursor(cursor) {
  return {type: SET_CURSOR, cursor};
}

export function dropText(text, categoryId) {
  return {type: DROP_TEXT, text, categoryId};
}

export function reset() {
  return {type: RESET};
}

export function toggleFormatting() {
  return {type: TOGGLE_FORMATTING};
}

export function setKeyMap(keyMap) {
  return {type: SET_KEY_MAP, keyMap}
}
