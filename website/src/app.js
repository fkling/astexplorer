import 'regenerator-runtime/runtime';
import * as LocalStorage from './components/LocalStorage';
import ASTOutputContainer from './containers/ASTOutputContainer';
import CodeEditorContainer from './containers/CodeEditorContainer';
import ErrorMessageContainer from './containers/ErrorMessageContainer';
import GistBanner from './components/GistBanner';
import LoadingIndictorContainer from './containers/LoadingIndicatorContainer';
import ParserSelectorContainer from './containers/ParserSelectorContainer';
import PasteDropTargetContainer from './containers/PasteDropTargetContainer';
import PubSub from 'pubsub-js';
import React from 'react';
import SettingsDialogContainer from './containers/SettingsDialogContainer';
import ShareDialogContainer from './containers/ShareDialogContainer';
import SplitPane from './components/SplitPane';
import ToolbarContainer from './containers/ToolbarContainer';
import TransformerContainer from './containers/TransformerContainer';
import createSagaMiddleware from 'redux-saga'
import debounce from './utils/debounce';
import saga from './store/sagas';
import {Provider, connect} from 'react-redux';
import {astexplorer, persist, revive} from './store/reducers';
import {createStore, applyMiddleware, compose} from 'redux';
import {canSaveTransform, getRevision, showTransformer} from './store/selectors';
import {enableBatching} from 'redux-batched-actions';
import {loadSnippet} from './store/actions';
import {render} from 'react-dom';
import * as gist from './storage/gist';
import * as parse from './storage/parse';
import StorageHandler from './storage';
import * as registry from './registry';

import 'codemirror/mode/javascript/javascript';

function resize() {
  PubSub.publish('PANEL_RESIZE');
}

function App(props) {
  return (
    <div>
      <ErrorMessageContainer />
      <div className={'dropTarget' + (props.hasError ? ' hasError' : '')}>
        <PasteDropTargetContainer>
          <LoadingIndictorContainer />
          <SettingsDialogContainer />
          <ShareDialogContainer />
          {props.showToolSelector ?
            <div id="root">
              <ToolbarContainer />
              <ParserSelectorContainer registry={registry} />
            </div> :
            <div id="root">
              <ToolbarContainer />
              <GistBanner />
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
            </div>
          }
        </PasteDropTargetContainer>
      </div>
    </div>
  );
}

App.propTypes = {
  hasError: React.PropTypes.bool,
  showTransformer: React.PropTypes.bool,
  showToolSelector: React.PropTypes.bool,
};

const AppContainer = connect(
  state => ({
    showTransformer: showTransformer(state),
    hasError: !!state.error,
    showToolSelector: state.showToolSelector,
  })
)(App);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

Promise.all([
  registry.loadParsers(),
  revive(LocalStorage.readState(), registry),
]).then(([parsers, state]) => {
    const store = createStore(
      enableBatching(astexplorer),
      state,
      composeEnhancers(
        applyMiddleware(sagaMiddleware)
      )
    );
    store.subscribe(debounce(() => {
      const state = store.getState();
      // We are not persisting the state while looking at an existing revision
      if (!getRevision(state)) {
        LocalStorage.writeState(persist(state));
      }
    }));
    sagaMiddleware.run(saga, new StorageHandler([gist, parse]), registry);

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
  });
