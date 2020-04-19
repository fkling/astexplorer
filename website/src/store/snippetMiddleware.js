import * as selectors from './selectors.js';
import * as actions from './actions.js';
import {logError, logEvent} from '../utils/logger.js';

let clearURLOnClearError = false;
let cancelLoad = () => {}

export default storageAdapter => store => next => action => {
  switch (action.type) {
    case actions.CLEAR_ERROR:
      // If CLEAR_ERROR action happens after a URL was loaded, clear the URL
      if (clearURLOnClearError) {
        clearURLOnClearError = false;
        global.location.hash = '';
      }
      return next(action);
    case actions.LOAD_SNIPPET:
      return loadSnippet(store.getState(), next, storageAdapter);
    case actions.SAVE:
      next(actions.startSave(action.fork));
      saveSnippet(action, store.getState(), next, storageAdapter)
        .then(() => next(actions.endSave(action.fork)));
      break;
    default:
      // Pass on
      return next(action);
  }
}

async function loadSnippet(state, next, storageAdapter) {
  // Ignore changes to the URL while a snippet is being saved (that process will
  // update the URL.
  if (selectors.isSaving(state) || selectors.isForking(state)) {
    return;
  }

  // Cancel any previous snippet loader (see below)
  cancelLoad();
  // Do not clear URL anymore, we are loading a new one
  clearURLOnClearError = false;

  next(actions.setError(null));
  next(actions.startLoadingSnippet());

  try {
    let cancelled = false;
    cancelLoad = () => cancelled = true;
    const revision = await storageAdapter.fetchFromURL();
    // revision can be null if the URL is "empty"
    if (!cancelled) {
      if (revision) {
        logEvent('snippet', 'load');
        next(actions.setSnippet(revision));
      } else {
        next(actions.clearSnippet());
      }
    }
  } catch(error) {
    const errorMessage = 'Failed to fetch revision: ' + error.message;
    logError(errorMessage);

    clearURLOnClearError = true;
    next(actions.setError(new Error(errorMessage)));
  } finally {
    next(actions.doneLoadingSnippet());
  }
}

async function saveSnippet({fork}, state, next, storageAdapter) {
  const revision = selectors.getRevision(state);
  const parser = selectors.getParser(state);
  const parserSettings = selectors.getParserSettings(state);
  const code = selectors.getCode(state);
  const transformCode = selectors.getTransformCode(state);
  const transformer = selectors.getTransformer(state);
  const showTransformPanel = selectors.showTransformer(state);

  const eventAction = fork ? 'fork' : (revision ? 'new_revision' : 'create');

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

  logEvent('snippet', eventAction, data.toolID);

  try {
    let newRevision;
    if (fork) {
      newRevision = await storageAdapter.fork(revision, data);
    } else if (revision) {
      newRevision = await storageAdapter.update(revision, data);
    } else {
      newRevision = await storageAdapter.create(data);
    }
    if (newRevision) {
      storageAdapter.updateHash(newRevision);
    }
  } catch (error) {
    logError(error.message);
    next(actions.setError(error));
  }
}
