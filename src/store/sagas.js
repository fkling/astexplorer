/*eslint no-constant-condition:0*/

import * as actions from './actions';
import {takeEvery} from 'redux-saga'
import { put, select, call } from 'redux-saga/effects'
import {batchActions} from 'redux-batched-actions';
import Snippet from '../Snippet';
import {logEvent, logError} from '../utils/logger';
import {
  getParser,
  getParserSettings,
  getCode,
  isSaving,
  isForking,
  getSnippet,
  getTransformer,
  getTransformCode,
  showTransformer,
} from './selectors';

function updateHashWithIDAndRevision(id, rev) {
  const newHash = '/' + id + (rev && rev !== 0 ? '/' + rev : '');
  global.location.hash = newHash;
}

function* save(fork) {
  let action = 'new_revision';
  let [
    snippet,
    parser,
    parserSettings,
    code,
    transformCode,
    transformer,
    showTransformPanel,
  ] = yield [
    select(getSnippet),
    select(getParser),
    select(getParserSettings),
    select(getCode),
    select(getTransformCode),
    select(getTransformer),
    select(showTransformer),
  ];
  if (fork || !snippet) {
    snippet = new Snippet();
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
    const response = yield snippet.createNewRevision(data);
    if (response) {
      updateHashWithIDAndRevision(snippet.id, response.revisionNumber);
    }
  } catch (error) {
    logError(error.message);
    yield put(actions.setError(error));
  }
}

export function* watchSave({fork}) {
  yield put(actions.startSave(fork));
  yield* save(fork);
  yield put(actions.endSave(fork));
}

function* watchSnippetURI() {
  const {saving, forking} = yield [select(isSaving), select(isForking)];
  if (saving || forking) {
    return;
  }

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
    return;
  }

  if (data) {
    logEvent('snippet', 'load');
  }

  yield put(batchActions([
    data ?
      actions.setSnippet(data.snippet, data.revision) :
      actions.clearSnippet(),
    actions.doneLoadingSnippet(),
  ]));
}

export default function*() {
  yield takeEvery(actions.LOAD_SNIPPET, watchSnippetURI);
  yield takeEvery(actions.SAVE, watchSave);
}
