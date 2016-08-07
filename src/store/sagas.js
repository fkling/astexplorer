/*eslint no-constant-condition:0*/

import * as actions from './actions';
import { put, take, select, call } from 'redux-saga/effects'
import * as LocalStorage from '../LocalStorage';
import {getParserByID, getDefaultParser, getCategoryByID} from '../parsers';
import {batchActions} from 'redux-batched-actions';
import getDataFromRevision from './getDataFromRevision';
import Snippet from '../Snippet';
import {logEvent, logError} from '../utils/logger';

function updateHashWithIDAndRevision(id, rev) {
  const newHash = '/' + id + (rev && rev !== 0 ? '/' + rev : '');
  global.location.hash = newHash;
}

function getParserForCategory(category) {
  let parser = getParserByID(LocalStorage.getParser(category.id)) ||
    getDefaultParser(category);

  // Verify that local storage wasn't corrupted
  if (parser.category !== category) {
    parser = getDefaultParser(category);
  }

  return parser;
}

function getParserSettingsForParser(parser) {
  return LocalStorage.getParserSettings(parser.id) || {};
}

function* save(fork) {
  let action = 'new_revision';
  let [snippet, parser, code, transformCode, transformer] = yield [
    select(getSnippet),
    select(getParser),
    select(getCode),
    select(getTransformerCode),
    select(getTransformer),
  ];
  if (fork || !snippet) {
    snippet = new Snippet();
    action = fork ? 'fork' : 'create';
  }

  const data = {
    parserID: parser.id,
  };
  if (code !== parser.category.codeExample) {
    data.code = code;
  }
  if (transformer) {
    data.toolID = transformer.id;
  }
  if (transformCode && transformCode !== transformer.defaultTransform) {
    data.transform = transformCode;
  }

  logEvent('snippet', action, data.toolID);

  try {
    const response = yield snippet.createNewRevision(data);
    if (response) {
      updateHashWithIDAndRevision(snippet.id, response.revisionNumber);
    }
  } catch (error) {
    logError(error.message);
    yield put(actions.setError(error));
  }
}

export function getParser(state) {
  return state.parser;
}

export function getCode(state) {
  return state.code;
}

export function isSaving(state) {
  return state.saving;
}

export function isForking(state) {
  return state.forking;
}

export function getSnippet(state) {
  return state.selectedSnippet;
}

export function getTransformer(state) {
  return state.transform.transformer;
}

export function getTransformerCode(state) {
  return state.transform.code;
}

export function* watchSave() {
  while (true) {
    const {fork} = yield take(actions.SAVE);
    yield put(actions.startSave(fork));
    yield* save(fork);
    yield put(actions.endSave(fork));
  }
}

export function* watchCategoryChange() {
  while (true) {
    const {category} = yield take(actions.SELECT_CATEGORY);
    const parser = getParserForCategory(category);

    yield put(batchActions([
      actions.setWorkbenchState({
        parser,
        parserSettings: getParserSettingsForParser(parser),
      }),
      actions.clearSnippet(),
    ]));
  }
}

export function* watchSnippetChange() {
  while (true) {
    const {snippet, revision} = yield take(actions.SET_SNIPPET);
    const {
      parser,
      code,
    } = getDataFromRevision(revision);
    yield put(batchActions([
      actions.setWorkbenchState({
        parser,
        parserSettings: getParserSettingsForParser(parser),
        code,
      }),
      actions.setSnippet(snippet, revision),
    ]));
  }
}

export function* watchSnippetURI() {
  while (true) {
    yield take(actions.LOAD_SNIPPET);
    const {saving, forking} = yield [select(isSaving), select(isForking)];
    if (saving || forking) {
      continue;
    }
    logEvent('snippet', 'load');

    yield put(batchActions([
      actions.setError(null),
      actions.startLoadingSnippet(),
    ]));
    let data;
    try {
      data = yield call(Snippet.fetchFromURL);
    } catch(error) {
      const errorMessage = 'Failed to fetch revision: ' + error.message;
      logError(errorMessage);

      yield put(batchActions([
        actions.setError(new Error(errorMessage)),
        actions.doneLoadingSnippet(),
      ]));
      continue;
    }

    if (data) {
      const {parser, code, transformer, transformCode} =
        getDataFromRevision(data.revision);
      yield put(batchActions([
        actions.setSnippet(data.snippet, data.revision),
        actions.setWorkbenchState({
          code,
          parser,
          parserSettings: getParserSettingsForParser(parser),
        }),
        actions.doneLoadingSnippet(),
        transformer ?
          actions.setTransformState({transformer, code: transformCode}) :
          actions.hideTransformer(),
      ]));
    } else {
      const parser = yield select(getParser);
      const code = parser.category.codeExample;
      yield put(batchActions([
        actions.clearSnippet(),
        actions.setWorkbenchState({code}),
        actions.doneLoadingSnippet(),
      ]));
    }
  }
}

export function* watchSelectTransformer() {
  while (true) {
    const {transformer} = yield take(actions.SELECT_TRANSFORMER);
    yield put(actions.startLoadingSnippet());
    let parser = getParserByID(transformer.defaultParserID) ||
      (yield select(getParser));

    const code = transformer.defaultTransform;
    const todo = [
      actions.setTransformState({transformer, code}),
      actions.doneLoadingSnippet(),
    ];
    if (parser !== (yield select(getParser))) {
      todo.push(actions.setWorkbenchState({
        parser,
        parserSettings: getParserSettingsForParser(parser),
      }));
    }
    yield put(batchActions(todo));
  }
}

export function* watchDropText() {
  while (true) {
    const {categoryId} = yield take(actions.DROP_TEXT);
    const currentParser = yield select(getParser);

    logEvent('text', 'drop', categoryId);

    if (currentParser.category.id !== categoryId) {
      const parser = getParserForCategory(getCategoryByID(categoryId));
      yield put(actions.setWorkbenchState({
        parser,
        parserSettings: getParserSettingsForParser(parser),
      }));
    }
  }
}
