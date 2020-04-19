import {batchActions} from 'redux-batched-actions';
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
      return loadSnippet(storageAdapter, store.getState(), next);
    default:
      // Pass on
      return next(action);
  }
}

async function loadSnippet(storageAdapter, state, next) {
  // Don't treat the URL change in response to saving or forking a snippet as
  // a loading event.
  if (selectors.isSaving(state) || selectors.isForking(state)) {
    return;
  }

  // Cancel any previous snippet loader (see below)
  cancelLoad();
  // Do not clear URL anymore, we are loading a new one
  clearURLOnClearError = false;

  next(batchActions([
    actions.setError(null),
    actions.startLoadingSnippet(),
  ]));

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
    // FIXME: When should this be called?
  } finally {
    next(actions.doneLoadingSnippet());
  }
}
