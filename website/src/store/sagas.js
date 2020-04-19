/*eslint no-constant-condition:0*/

import * as actions from './actions';
import {
  all,
  takeEvery,
  put,
  select,
} from 'redux-saga/effects';
import {logEvent, logError} from '../utils/logger';
import {
  getParser,
  getParserSettings,
  getCode,
  getRevision,
  getTransformer,
  getTransformCode,
  showTransformer,
} from './selectors';

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
  ] = yield all([
    select(getRevision),
    select(getParser),
    select(getParserSettings),
    select(getCode),
    select(getTransformCode),
    select(getTransformer),
    select(showTransformer),
  ]);
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
    filename: `source.${parser.category.fileExtension}`,
    code,
  };
  if (showTransformPanel && transformer) {
    data.toolID = transformer.id;
    data.versions[transformer.id] = transformer.version;
    data.transform = transformCode;
  }

  logEvent('snippet', action, data.toolID);

  try {
    let newRevision;
    if (fork) {
      newRevision = yield storageAdapter.fork(revision, data);
    } else if (revision) {
      newRevision = yield storageAdapter.update(revision, data);
    } else {
      newRevision = yield storageAdapter.create(data);
    }
    if (newRevision) {
      storageAdapter.updateHash(newRevision);
    }
  } catch (error) {
    logError(error.message);
    yield put(actions.setError(error));
  }
}

function* watchSave(storageAdapter, {fork}) {
  yield put(actions.startSave(fork));
  yield* save(fork, storageAdapter);
  yield put(actions.endSave(fork));
}

export default function*(storageAdapter) {
  yield takeEvery(actions.SAVE, watchSave, storageAdapter);
}
