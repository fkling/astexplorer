import * as actions from './actions';
import {getParserByID, getTransformerByID} from '../parsers';

const initialState = {

  // UI related state
  showSettingsDialog: false,
  showShareDialog: false,
  loadingSnippet: false,
  forking: false,
  saving: false,
  cursor: null,
  error: null,
  showToolSelector: true,

  // Snippet related state
  selectedRevision: null,

  // Workbench settings

  // Contains local settings of all parsers
  parserSettings: {},

  workbench: {
    parser: null,
    parserSettings: {},
    parseError: null,
    code: null,
    initialCode: null,
    transform: {
      code: '',
      initialCode: '',
    },
  },

};

/**
 * Returns the subset of the data that makes sense to persist between visits.
 */
export function persist(state) {
  return {
    ...pick(state, 'parserSettings', 'parserPerCategory'),
    workbench: {
      parser: state.workbench.parser && state.workbench.parser.id,
      code: state.workbench.code,
      transform: pick(state.workbench.transform, 'code'),
    },
  };
}

/**
 * When read from persistent storage, set the last stored code as initial version.
 * This is necessary because we use CodeMirror as an uncontrolled component.
 */
export function revive(state=initialState, parserRegistry) {
  const newState = {
    ...state,
    workbench: {
      ...state.workbench,
      initialCode: state.workbench.code,
      transform: {
        ...state.workbench.transform,
        initialCode: state.workbench.transform.code,
      },
    },
  };

  if (state.workbench.parser) {
    return parserRegistry.loadParser(state.workbench.parser)
      .then(parser => {
        newState.workbench.parser = parser;
        newState.workbench.parserSettings = state.parserSettings[parser.id] || {};
        if (!newState.workbench.code) {
          newState.workbench.code = newState.workbench.initialCode = parser.codeExample;
        }
        return newState;
      })
      .catch(error => {
        newState.workbench.parser = null;
        newState.error = error;
      });
  } else {
    return Promise.resolve(newState);
  }
}

export function astexplorer(state=initialState, action) {
  return {
    // UI related state
    showSettingsDialog: showSettingsDialog(state.showSettingsDialog, action),
    showShareDialog: showShareDialog(state.showShareDialog, action),
    showToolSelector: showToolSelector(state.showToolSelector, action),
    loadingSnippet: loadSnippet(state.loadingSnippet, action),
    saving: saving(state.saving, action),
    forking: forking(state.forking, action),
    cursor: cursor(state.cursor, action),
    error: error(state.error, action),

    // Snippet related state
    activeRevision: activeRevision(state.activeRevision, action),

    // Workbench settings
    parserPerCategory: parserPerCategory(state.parserPerCategory, action),
    parserSettings: parserSettings(state.parserSettings, action, state),
    workbench: workbench(state.workbench, action, state),
  };
}

function workbench(state=initialState.workbench, action, fullState) {

  switch (action.type) {
    case actions.DROP_TEXT:
      // TODO: Fix drop text
      return {
        ...state,
        //...parserFromCategory(getCategoryByID(action.categoryId)),
        code: action.text,
        initialCode: action.text,
      };
    case actions.SET_PARSE_ERROR:
      return {...state, parseError: action.error};
    case actions.SET_PARSER_SETTINGS:
      return {...state, parserSettings: action.settings};
    case actions.SET_PARSER:
      {
        const newState = {...state, parser: action.parser};
        if (action.parser !== state.parser) {
          // Update parser settings
          newState.parserSettings =
            fullState.parserSettings[action.parser.id] || {};
          // TODO: Reset code on category change
        }
        if (!state.code) {
          newState.code = newState.initialCode = action.parser.codeExample;
        }
        if (action.parser.transform && !state.transform.code) {
          // TODO: Reset transform code on transformer change
            newState.transform.code = newState.transform.initialCode =
              action.parser.transformExample;
        }
        return newState;
      }
    case actions.SET_CODE:
      return {...state, code: action.code};
    case actions.SET_TRANSFORM:
      return {
        ...state,
        transform: {
          ...state.transform,
          code: action.code,
        },
      };
    case actions.SET_SNIPPET:
      {
        const {revision} = action;
        // TODO: call getParser instead

        const transformerID = revision.getTransformerID();
        const parserID = revision.getParserID();

        return {
          ...state,
          parser: getParserByID(parserID),
          parserSettings: revision.getParserSettings() || fullState.parserSettings[parserID] || {},
          code: revision.getCode(),
          initialCode: revision.getCode(),
          transform: {
            ...state.transform,
            code: revision.getTransformCode(),
            initialCode: revision.getTransformCode(),
          },
        };
      }
    case actions.CLEAR_SNIPPET:
    case actions.RESET:
      {
        const reset = Boolean(actions.RESET);
        const newState = {
          ...state,
          parserSettings: fullState.parserSettings[state.parser.id] || {},
          code: state.parser.codeExample,
          initialCode: state.parser.codeExample,
        };
        if (fullState.activeRevision && fullState.activeRevision.getTransformerID() || reset && state.transform.transformer) {
          // Clear transform as well
          const transformer = getTransformerByID(state.transform.transformer);
          newState.transform = {
            ...state.transform,
            code: transformer.defaultTransform,
            initialCode: transformer.defaultTransform,
          };
        }
        return newState;
      }
    default:
      return state;
  }
}

function parserSettings(state=initialState.parserSettings, action, fullState) {
  switch (action.type) {
    case actions.SET_PARSER_SETTINGS:
      if (fullState.activeRevision) {
        // If a revision is loaded, we are **not** storing changes to the
        // settings in our local copy
        return state;
      }
      return {
        ...state,
        [fullState.workbench.parser.id]: action.settings,
      };
    default:
      return state;
  }
}

function parserPerCategory(state=initialState.parserPerCategory, action) {
  switch (action.type) {
    case actions.SET_PARSER:
      return {...state, [action.parser.category.id]: action.parser.id};
    default:
      return state;
  }
}

function showSettingsDialog(state=initialState.showSettingsDialog, action) {
  switch(action.type) {
    case actions.OPEN_SETTINGS_DIALOG:
      return true;
    case actions.CLOSE_SETTINGS_DIALOG:
      return false;
    default:
      return state;
  }
}

function showToolSelector(state=initialState.showToolSelector, action) {
  switch(action.type) {
    case actions.OPEN_TOOL_SELECTOR:
      return true;
    case actions.CLOSE_TOOL_SELECTOR:
    case actions.SET_PARSER:
      return false;
    default:
      return state;
  }
}

function showShareDialog(state=initialState.showShareDialog, action) {
  switch(action.type) {
    case actions.OPEN_SHARE_DIALOG:
      return true;
    case actions.CLOSE_SHARE_DIALOG:
      return false;
    default:
      return state;
  }
}

function loadSnippet(state=initialState.loadingSnippet, action) {
  switch(action.type) {
    case actions.START_LOADING_SNIPPET:
      return true;
    case actions.DONE_LOADING_SNIPPET:
      return false;
    default:
      return state;
  }
}

function saving(state=initialState.saving, action) {
  switch(action.type) {
    case actions.START_SAVE:
      return !action.fork;
    case actions.END_SAVE:
      return false;
    default:
      return state;
  }
}

function forking(state=initialState.forking, action) {
  switch(action.type) {
    case actions.START_SAVE:
      return action.fork;
    case actions.END_SAVE:
      return false;
    default:
      return state;
  }
}

function cursor(state=initialState.cursor, action) {
  switch(action.type) {
    case actions.SET_CURSOR:
      return action.cursor;
    case actions.SET_CODE:
      // If this action is triggered and the cursor = 0, then the code must be
      // loaded
      if (action.cursor != null && action.cursor !== 0) {
        return action.cursor;
      }
      return state;
    case actions.RESET:
    case actions.SET_SNIPPET:
    case actions.CLEAR_SNIPPET:
      return null;
    default:
      return state;
  }
}

function error(state=initialState.error, action) {
  switch (action.type) {
    case actions.SET_ERROR:
      return action.error;
    case actions.CLEAR_ERROR:
      return null;
    default:
      return state;
  }
}

function activeRevision(state=initialState.selectedRevision, action) {
  switch (action.type) {
    case actions.SET_SNIPPET:
      return action.revision;
    case actions.SELECT_CATEGORY:
    case actions.CLEAR_SNIPPET:
    case actions.RESET:
      return null;
    default:
      return state;
  }
}

function pick(obj, ...properties) {
  return properties.reduce(
    (result, prop) => (result[prop] = obj[prop], result),
    {}
  );
}
