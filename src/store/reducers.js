import * as actions from './actions';

export const initialState = {
  showSettingsDialog: false,
  loadingSnippet: true,
  selectedSnippet: null,
  selectedRevision: null,
  forking: false,
  saving: false,
  parser: null,
  parserSettings: null,
  droppedText: null,
  code: null,
  focusPath: [],
  cursor: null,
  error: null,
  parseError: null,
  transform: {
    code: '',
    transformer: null,
    showTransformPanel: false,
  },
};

export function astexplorer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_WORKBENCH_STATE:
      var newState = action.state;
      // If we switched to a parser of a different category, we need to
      // switch to the default code example
      if (newState.parser &&
          state.parser.category !== newState.parser.category) {
        newState.code = newState.parser.category.codeExample;
      }
      // Reset cursor if new code and no explicit cursor is set
      if ('code' in newState && newState.cursor == null) {
        newState.cursor = null;
      }
      return {...state, ...newState};
    case actions.SET_PARSER_SETTINGS:
      return {...state, parserSettings: action.settings};
    case actions.SET_PARSE_ERROR:
      return {...state, parseError: action.error};
    case actions.SET_SNIPPET: {
      return {
        ...state,
        selectedSnippet: action.snippet,
        selectedRevision: action.revision,
        droppedText: null,
      };
    }
    case actions.CLEAR_SNIPPET:
      return {
        ...state,
        selectedSnippet: null,
        selectedRevision: null,
        code: state.parser.category.codeExample,
        cursor: null,
        droppedText: null,
      };
    case actions.START_LOADING_SNIPPET:
      return {...state, loadingSnippet: true};
    case actions.DONE_LOADING_SNIPPET:
      return {...state, loadingSnippet: false};
    case actions.OPEN_SETTINGS_DIALOG:
      return {...state, showSettingsDialog: true};
    case actions.CLOSE_SETTINGS_DIALOG:
      return {...state, showSettingsDialog: false};
    case actions.SET_ERROR:
      return {...state, error: action.error};
    case actions.SET_TRANSFORM:
      return {
        ...state,
        transform: {
          ...state.transform,
          showTransformer: true,
          ...action.state,
        },
      };
    case actions.HIDE_TRANSFORMER:
      return {
        ...state,
        transform: {
          ...state.transform,
          showTransformer: false,
        },
      };
    case actions.START_SAVE:
      return {...state, saving: !action.fork, forking: action.fork};
    case actions.END_SAVE:
      return {...state, saving: false, forking: false};
    case actions.DROP_TEXT:
      return {...state, code: action.text, droppedText: action.text};
  }
  return state;
}
