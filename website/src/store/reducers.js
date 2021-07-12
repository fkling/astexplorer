import * as actions from './actions';
import {getCategoryByID, getDefaultParser, getParserByID, getTransformerByID} from '../parsers';

const defaultParser = getDefaultParser(getCategoryByID('javascript'));

const initialState = {

  // UI related state
  showSettingsDialog: false,
  showSettingsDrawer: false,
  showShareDialog: false,
  loadingSnippet: false,
  forking: false,
  saving: false,
  cursor: null,
  error: null,
  showTransformPanel: false,

  // Snippet related state
  selectedRevision: null,

  // Workbench settings

  // Contains local settings of all parsers
  parserSettings: {},

  // Remember selected parser per category
  parserPerCategory: {},

  workbench: {
    parser: defaultParser.id,
    parserSettings: null,
    parseError: null,
    code: defaultParser.category.codeExample,
    keyMap: 'default',
    initialCode: defaultParser.category.codeExample,
    transform: {
      code: '',
      initialCode: '',
      transformer: null,
      transformResult: null,
    },
  },

  enableFormatting: false,

};

/**
 * Returns the subset of the data that makes sense to persist between visits.
 */
export function persist(state) {
  return {
    ...pick(state, 'showTransformPanel', 'parserSettings', 'parserPerCategory'),
    workbench: {
      ...pick(state.workbench, 'parser', 'code', 'keyMap'),
      transform: pick(state.workbench.transform, 'code', 'transformer'),
    },
  };
}

/**
 * When read from persistent storage, set the last stored code as initial version.
 * This is necessary because we use CodeMirror as an uncontrolled component.
 */
export function revive(state=initialState) {
  return {
    ...state,
    workbench: {
      ...state.workbench,
      initialCode: state.workbench.code,
      parserSettings: state.parserSettings[state.workbench.parser] || null,
      transform: {
        ...state.workbench.transform,
        initialCode: state.workbench.transform.code,
      },
    },
  };
}

export function astexplorer(state=initialState, action) {
  return {
    // UI related state
    showSettingsDialog: showSettingsDialog(state.showSettingsDialog, action),
    showSettingsDrawer: showSettingsDrawer(state.showSettingsDrawer, action),
    showShareDialog: showShareDialog(state.showShareDialog, action),
    loadingSnippet: loadSnippet(state.loadingSnippet, action),
    saving: saving(state.saving, action),
    forking: forking(state.forking, action),
    cursor: cursor(state.cursor, action),
    error: error(state.error, action),
    showTransformPanel: showTransformPanel(state.showTransformPanel, action),

    // Snippet related state
    activeRevision: activeRevision(state.activeRevision, action),

    // Workbench settings
    parserPerCategory: parserPerCategory(state.parserPerCategory, action),
    parserSettings: parserSettings(state.parserSettings, action, state),
    workbench: workbench(state.workbench, action, state),
    enableFormatting: format(state.enableFormatting, action, state),
  };
}

function format(state=initialState.enableFormatting, action) {
  if (action.type === actions.TOGGLE_FORMATTING) return !state;
  return state;
}

function getDefaultTransform(transformer, workbenchState) {
  if (typeof transformer.formatCodeExample === 'function') {
    return transformer.formatCodeExample(
      transformer.defaultTransform,
      {
        parser: workbenchState.parser,
        parserSettings: workbenchState.parserSettings || {},
      },
    )
  }
  return transformer.defaultTransform
}

function workbench(state=initialState.workbench, action, fullState) {
  function parserFromCategory(category) {
    const parser = fullState.parserPerCategory[category.id] ||
      getDefaultParser(category).id;
    return {
      parser,
      parserSettings: fullState.parserSettings[parser] || null,
      code: category.codeExample,
      initialCode: category.codeExample,
    };
  }

  switch (action.type) {
    case actions.SELECT_CATEGORY:
      return {
        ...state,
        ...parserFromCategory(action.category),
      };
    case actions.DROP_TEXT:
      return {
        ...state,
        ...parserFromCategory(getCategoryByID(action.categoryId)),
        code: action.text,
        initialCode: action.text,
      };
    case actions.SET_PARSE_RESULT:
      return {...state, parseResult: action.result};
    case actions.SET_PARSER_SETTINGS:
      return {...state, parserSettings: action.settings};
    case actions.SET_PARSER:
      {
        const newState = {...state, parser: action.parser.id};
        if (action.parser !== state.parser) {
          // Update parser settings
          newState.parserSettings =
            fullState.parserSettings[action.parser.id] || null;

          // Check if we might want to reformat the code example
          const transformer = getTransformerByID(state.transform.transformer)
          if (transformer && state.transform.code === getDefaultTransform(transformer, state)) {
            newState.transform = {
              ...state.transform,
              code: getDefaultTransform(transformer, newState),
            }
          }
        }
        return newState;
      }
    case actions.SET_CODE:
      return {...state, code: action.code};
    case actions.SELECT_TRANSFORMER:
      {
        const parserIsCompatible =
          action.transformer.compatibleParserIDs && action.transformer.compatibleParserIDs.has(state.parser)
        const differentParser =
          action.transformer.defaultParserID !== state.parser && !parserIsCompatible;
        const differentTransformer =
          action.transformer.id !== state.transform.transformer ;

        if (!(differentParser || differentTransformer)) {
          return state;
        }

        const newState = {...state};

        if (differentParser) {
          newState.parser = action.transformer.defaultParserID;
          newState.parserSettings =
            fullState.parserSettings[action.transformer.defaultParserID] || null;
        }

        if (differentTransformer) {
          const snippetHasDifferentTransform = fullState.activeRevision &&
            fullState.activeRevision.getTransformerID() === action.transformer.id;
          newState.transform = {
            ...state.transform,
            transformer: action.transformer.id,
            transformResult: null,
            code: snippetHasDifferentTransform ?
              state.transform.code :
              getDefaultTransform(action.transformer, state),
            initialCode: snippetHasDifferentTransform ?
              fullState.activeRevision.getTransformCode() :
              getDefaultTransform(action.transformer, state),
          };
        }

        return newState;
      }
    case actions.SET_TRANSFORM:
      return {
        ...state,
        transform: {
          ...state.transform,
          code: action.code,
        },
      };
    case actions.SET_TRANSFORM_RESULT:
      return {
        ...state,
        transform: {
          ...state.transform,
          transformResult: action.result,
        },
      };
    case actions.SET_SNIPPET:
      {
        const {revision} = action;

        const transformerID = revision.getTransformerID();
        const parserID = revision.getParserID();

        return {
          ...state,
          parser: parserID,
          parserSettings: revision.getParserSettings() || fullState.parserSettings[parserID] || null,
          code: revision.getCode(),
          initialCode: revision.getCode(),
          transform: {
            ...state.transform,
            transformer: transformerID,
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
          parserSettings: fullState.parserSettings[state.parser] || null,
          code: getParserByID(state.parser).category.codeExample,
          initialCode: getParserByID(state.parser).category.codeExample,
        };
        if (fullState.activeRevision && fullState.activeRevision.getTransformerID() || reset && state.transform.transformer) {
          // Clear transform as well
          const transformer = getTransformerByID(state.transform.transformer);
          newState.transform = {
            ...state.transform,
            code: getDefaultTransform(transformer, state),
            initialCode: getDefaultTransform(transformer, state),
          };
        }
        return newState;
      }
    case actions.SET_KEY_MAP:
      return {...state, keyMap: action.keyMap};
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
        [fullState.workbench.parser]: action.settings,
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

function showSettingsDrawer(state=initialState.showSettingsDrawer, action) {
  switch(action.type) {
    case actions.EXPAND_SETTINGS_DRAWER:
      return true;
    case actions.COLLAPSE_SETTINGS_DRAWER:
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

function showTransformPanel(state=initialState.showTransformPanel, action) {
  switch (action.type) {
    case actions.SELECT_TRANSFORMER:
      return true;
    case actions.HIDE_TRANSFORMER:
    case actions.SELECT_CATEGORY:
    case actions.CLEAR_SNIPPET:
      return false;
    case actions.SET_SNIPPET:
      return Boolean(action.revision.getTransformerID());
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
    {},
  );
}
