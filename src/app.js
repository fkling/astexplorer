import * as sagas from './store/sagas';
import ASTOutputContainer from './containers/ASTOutputContainer';
import CodeEditorContainer from './containers/CodeEditorContainer';
import ErrorMessageContainer from './containers/ErrorMessageContainer';
import LoadingIndictorContainer from './containers/LoadingIndicatorContainer';
import * as LocalStorage from './LocalStorage';
import PasteDropTargetContainer from './containers/PasteDropTargetContainer';
import PubSub from 'pubsub-js';
import React from 'react';
import SettingsDialogContainer from './containers/SettingsDialogContainer';
import SplitPane from './SplitPane';
import ToolbarContainer from './containers/ToolbarContainer';
import TransformerContainer from './containers/TransformerContainer';
import createSagaMiddleware from 'redux-saga'
import debounce from './utils/debounce';
import {Provider, connect} from 'react-redux';
import {astexplorer, persist, revive} from './store/reducers';
import {createStore, applyMiddleware, compose} from 'redux';
import {canSaveTransform, getRevision} from './store/selectors';
import {enableBatching} from 'redux-batched-actions';
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
    showTransformer: state.showTransformPanel,
    hasError: !!state.error,
  })
)(App);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  enableBatching(astexplorer),
  revive(LocalStorage.readState()),
  composeEnhancers(
    applyMiddleware(
      createSagaMiddleware(
        sagas.watchSnippetURI,
        sagas.watchSave
      )
    )
  )
);
store.subscribe(debounce(() => {
  const state = store.getState();
  // We are not persisting the state while looking at an existing revision
  if (!getRevision(state)) {
    LocalStorage.writeState(persist(state));
  }
}));

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('container')
);

global.onhashchange = () => {
  store.dispatch(loadSnippet());
};

if (location.hash.length > 1) {
  store.dispatch(loadSnippet());
}

global.onbeforeunload = () => {
  const state = store.getState();
  if (canSaveTransform(state)) {
    return 'You have unsaved transform code. Do you really want to leave?';
  }
};
