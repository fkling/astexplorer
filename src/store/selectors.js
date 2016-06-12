import {createSelector} from 'reselect';
import isEqual from 'lodash.isequal';

function getParser(state) {
  return state.parser;
}

function getParserSettings(state) {
  return state.parserSettings;
}

function getSnippet(state) {
  return state.selectedSnippet;
}

function getCode(state) {
  return state.code;
}

function getRevision(state) {
  return state.selectedRevision;
}

function getCodeExample(state) {
  return state.parser.category.codeExample;
}

function getDroppedText(state) {
  return state.droppedText;
}

function getTransformExample(state) {
  return state.transform.transformer ?
    state.transform.transformer.defaultTransform :
    '';
}

function getTransformCode(state) {
  return state.transform.code;
}

function showTransformer(state) {
  return state.transform.showTransformer;
}

export const canFork = createSelector(
  [getSnippet],
  (snippet) => !!snippet
);

const defaultValue = createSelector(
  [getRevision, getCodeExample, getDroppedText, getParser],
  (revision, codeExample, droppedText, parser) => revision ?
    revision.get('code') ||  parser.category.codeExample :
    (droppedText != null ? droppedText : codeExample)
);
export {defaultValue};

const defaultTransformCode = createSelector(
  [getRevision, getTransformExample],
  (revision, example) => revision ?
    revision.get('transform') || example :
    example
);
export {defaultTransformCode};

export const canSaveCode = createSelector(
  [defaultValue, getCode],
  (defaultCode, code) => defaultCode !== code
);

export const canSaveTransform = createSelector(
  [showTransformer, defaultTransformCode, getTransformCode],
  (showTransformer, defaultCode, code) =>
    showTransformer && defaultCode !== code
);

const didParserSettingsChange = createSelector(
  [getParserSettings, getRevision],
  (parserSettings, revision) => {
    const savedParserSettings = revision && revision.getParserSettings();
    return !!revision &&
      !!savedParserSettings &&
      !isEqual(parserSettings, savedParserSettings);
  }
);

export const canSave = createSelector(
  [canSaveCode, canSaveTransform, didParserSettingsChange],
  (canSaveCode, canSaveTransform, didParserSettingsChange) => (
    canSaveCode || canSaveTransform || didParserSettingsChange
  )
);
