import {createSelector} from 'reselect';

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

export const canSaveCode = createSelector(
  [getRevision, getCode, getCodeExample],
  (revision, code, codeExample) => revision ?
    revision.get('code') !== code :
    codeExample !== code
);

export const canSaveTransform = createSelector(
  [showTransformer, getRevision, getTransformCode, getTransformExample],
  (showTransformer, revision, code, codeExample) => {
    if (!showTransformer) {
      return false;
    }
    return revision ?
      revision.get('transform') !== code :
      codeExample !== code
});

export const canSave = createSelector(
  [canSaveCode, canSaveTransform],
  (canSaveCode, canSaveTransform) => canSaveCode || canSaveTransform
);

export const canFork = createSelector(
  [getSnippet],
  (snippet) => !!snippet
);

export const defaultValue = createSelector(
  [getRevision, getCodeExample, getDroppedText],
  (revision, codeExample, droppedText) => revision ?
    revision.get('code') :
    (droppedText != null ? droppedText : codeExample)
);

export const defaultTransformCode = createSelector(
  [getRevision, getTransformExample],
  (revision, example) => revision ? revision.get('transform') : example
);
