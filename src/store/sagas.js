/*eslint no-constant-condition:0*/

import * as actions from './actions';
import { put, take, select, call } from 'redux-saga/effects'
import * as LocalStorage from '../LocalStorage';
import {getParserByID, getDefaultParser, getCategoryByID} from '../parsers';
import {batchActions} from 'redux-batched-actions';
import getDataFromRevision from './getDataFromRevision';
import Snippet from '../Snippet';


function updateHashWithIDAndRevision(id, rev) {
  global.location.hash = '/' + id + (rev && rev !== 0 ? '/' + rev : '');
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

function* save(fork) {
  let [snippet, parser, code] = yield [
    select(getSnippet),
    select(getParser),
    select(getCode),
  ];
  if (fork || !snippet) {
    snippet = new Snippet();
  }

  const data = {
    parserID: parser.id,
  };
  if (code !== parser.category.codeExample) {
    data.code = code;
  }

  try {
    const response = yield snippet.createNewRevision(data);
    if (response) {
      updateHashWithIDAndRevision(snippet.id, response.revisionNumber);
    }
  } catch (error) {
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
      actions.setWorkbenchState({parser}),
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

    yield put(batchActions([
      actions.setError(null),
      actions.startLoadingSnippet(),
    ]));
    let data;
    try {
      data = yield call(Snippet.fetchFromURL);
    } catch(error) {
      yield put(batchActions([
        actions.setError(new Error(
          'Failed to fetch revision: ' + error.message
        )),
        actions.doneLoadingSnippet(),
      ]));
      continue;
    }

    if (data) {
      const {parser, code, transformer, transformCode} =
        getDataFromRevision(data.revision);
      yield put(batchActions([
        actions.setSnippet(data.snippet, data.revision),
        actions.setWorkbenchState({code, parser}),
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
      todo.push(actions.setWorkbenchState({parser}));
    }
    yield put(batchActions(todo));
  }
}

export function* watchDropText() {
  while (true) {
    const {categoryId} = yield take(actions.DROP_TEXT);
    const currentParser = yield select(getParser);

    if (currentParser.category.id !== categoryId) {
      yield put(actions.setWorkbenchState({
        parser: getParserForCategory(getCategoryByID(categoryId)),
      }));
    }
  }
}
