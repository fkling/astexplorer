/*eslint no-constant-condition:0*/

import * as actions from './actions';
import {takeEvery} from 'redux-saga'
import { put, select, call } from 'redux-saga/effects'
import {batchActions} from 'redux-batched-actions';
import {logEvent, logError} from '../utils/logger';
import {
  getParser,
  getParserSettings,
  getCode,
  isSaving,
  isForking,
  getRevision,
  getTransformer,
  getTransformCode,
  showTransformer,
} from './selectors';

function updateHashWithIDAndRevision(id, rev) {
  const newHash = '/' + id + (rev && rev !== 0 ? '/' + rev : '');
  global.location.hash = newHash;
}

function* save(fork, storageAdapter) {
  let action = 'new_revision';
  let [
    revision,
    parser,
    parserSettings,
    code,
    transformCode,
    transformer,
    showTransformPanel,
  ] = yield [
    select(getRevision),
    select(getParser),
    select(getParserSettings),
    select(getCode),
    select(getTransformCode),
    select(getTransformer),
    select(showTransformer),
  ];
  if (fork || !revision) {
    action = fork ? 'fork' : 'create';
  }

  const data = {
    parserID: parser.id,
    settings: {
      [parser.id]: parserSettings,
    },
    versions: {
      [parser.id]: parser.version,
    },
  };
  if (code !== parser.category.codeExample) {
    data.code = code;
  }
  if (showTransformPanel && transformer) {
    data.toolID = transformer.id;
    data.versions[transformer.id] = transformer.version;
  }
  if (showTransformPanel && transformCode && transformCode !== transformer.defaultTransform) {
    data.transform = transformCode;
  }

  logEvent('snippet', action, data.toolID);

  try {
    const newRevision = yield fork ?
      storageAdapter.fork(revision.getSnippetID(), data) :
      storageAdapter.save(revision && revision.getSnippetID(), data);
    if (newRevision) {
      updateHashWithIDAndRevision(newRevision.getSnippetID(), newRevision.getRevisionID());
    }
  } catch (error) {
    logError(error.message);
    yield put(actions.setError(error));
  }
}

export function* watchSave(storageAdapter, {fork}) {
  yield put(actions.startSave(fork));
  yield* save(fork, storageAdapter);
  yield put(actions.endSave(fork));
}

function* watchSnippetURI(storageAdapter) {
  const {saving, forking} = yield [select(isSaving), select(isForking)];
  if (saving || forking) {
    return;
  }

  yield put(batchActions([
    actions.setError(null),
    actions.startLoadingSnippet(),
  ]));
  let revision;
  try {
    revision = yield call(storageAdapter.fetchFromURL);
  } catch(error) {
    const errorMessage = 'Failed to fetch revision: ' + error.message;
    logError(errorMessage);

    yield put(batchActions([
      actions.setError(new Error(errorMessage)),
      actions.doneLoadingSnippet(),
    ]));
    return;
  }

  if (revision) {
    logEvent('snippet', 'load');
  }

  yield put(batchActions([
    revision ?
      actions.setSnippet(revision) :
      actions.clearSnippet(),
    actions.doneLoadingSnippet(),
  ]));
}

export default function*(storageAdapter) {
  yield takeEvery(actions.LOAD_SNIPPET, watchSnippetURI, storageAdapter);
  yield takeEvery(actions.SAVE, watchSave, storageAdapter);
}
