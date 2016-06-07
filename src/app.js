import * as LocalStorage from './LocalStorage';
import * as sagas from './store/sagas';
import ASTOutputContainer from './containers/ASTOutputContainer';
import CodeEditorContainer from './containers/CodeEditorContainer';
import ErrorMessageContainer from './containers/ErrorMessageContainer';
import LoadingIndictorContainer from './containers/LoadingIndicatorContainer';
import PasteDropTargetContainer from './containers/PasteDropTargetContainer';
import PubSub from 'pubsub-js';
import React from 'react';
import SettingsDialogContainer from './containers/SettingsDialogContainer';
import SplitPane from './SplitPane';
import ToolbarContainer from './containers/ToolbarContainer';
import TransformerContainer from './containers/TransformerContainer';
import createSagaMiddleware from 'redux-saga'
import {Provider, connect} from 'react-redux';
import {astexplorer, initialState} from './store/reducers';
import {createStore, applyMiddleware} from 'redux';
import {defaultTransformCode} from './store/selectors';
import {enableBatching} from 'redux-batched-actions';
import {getCategoryByID, getDefaultParser, getParserByID} from './parsers';
import {loadSnippet} from './store/actions';
import {render} from 'react-dom';

function resize() {
  PubSub.publish('PANEL_RESIZE');
}

function App(props) {
  return (
    <div>
      <ErrorMessageContainer />
      <div className={'dropTarget' + (props.hasError ? ' hasError' : '')}>
        <PasteDropTargetContainer>
          <ToolbarContainer />
          <SplitPane
            className="splitpane-content"
            vertical={true}
            onResize={resize}>
            <SplitPane
              className="splitpane"
              onResize={resize}>
              <CodeEditorContainer />
              <ASTOutputContainer />
            </SplitPane>
            {props.showTransformer ? <TransformerContainer /> : null}
          </SplitPane>
          <LoadingIndictorContainer />
          <SettingsDialogContainer />
        </PasteDropTargetContainer>
      </div>
    </div>
  );
}

App.propTypes = {
  hasError: React.PropTypes.bool,
  showTransformer: React.PropTypes.bool,
};

const AppContainer = connect(
  state => ({
    showTransformer: state.transform.showTransformer,
    hasError: !!state.error,
  })
)(App);

const parser = getParserByID(LocalStorage.getParser()) ||
  getDefaultParser(getCategoryByID(LocalStorage.getCategory()));
const parserSettings = LocalStorage.getParserSettings(parser.id) || {};

const store = createStore(
  enableBatching(astexplorer),
  {
    ...initialState,
    parser,
    parserSettings,
  },
  applyMiddleware(
    createSagaMiddleware(
      sagas.watchSelectTransformer,
      sagas.watchSnippetURI,
      sagas.watchCategoryChange,
      sagas.watchSave,
      sagas.watchDropText
    )
  )
);

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('container')
);

global.onhashchange = () => {
  store.dispatch(loadSnippet());
};
global.onhashchange();

global.onbeforeunload = () => {
  const state = store.getState();
  if (state.transform.code !== defaultTransformCode(state)) {
    return 'You have unsaved transform code. Do you really want to leave?';
  }
};
