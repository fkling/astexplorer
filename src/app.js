import ASTOutput from './ASTOutput';
import Editor from './Editor';
import ErrorMessage from './ErrorMessage';
import PasteDropTarget from './PasteDropTarget';
import PubSub from 'pubsub-js';
import React from 'react';
import Snippet from './Snippet';
import SplitPane from './SplitPane';
import Toolbar from './Toolbar';
import TransformOutput from './TransformOutput';

import getFocusPath from './getFocusPath';
import getSourceLocationFromASTNode from './getSourceLocationFromASTNode';
import esprima from 'esprima';
import {keypress} from 'keypress';

var fs = require('fs');

var babel;
var defaultCode = fs.readFileSync(__dirname + '/codeExample.txt', 'utf8');
var defaultTransform =
  fs.readFileSync(__dirname + '/transformExample.txt', 'utf8');

function updateHashWithIDAndRevision(id, rev) {
  global.location.hash = '/' + id + (rev && rev !== 0 ? '/' + rev : '');
}

var App = React.createClass({
  getInitialState: function() {
    var snippet = this.props.snippet;
    var revision = this.props.revision;
    if ((snippet && !revision) || (!snippet && revision)) {
      throw Error('Must set both, snippet and revision');
    }
    const initialCode = revision && revision.get('code') || defaultCode;
    const initialTransform =
      revision && revision.get('transform') || defaultTransform;
    const showTransform = defaultTransform !== initialTransform;
    return {
      forking: false,
      saving: false,
      ast: null,
      focusPath: [],
      ...this._setCode(initialCode),
      ...this._setTransform(initialTransform),
      snippet: snippet,
      showTransformPanel: defaultTransform !== initialTransform,
      revision: revision,
      parser: showTransform ? 'babel' : 'esprima',
    };
  },

  componentDidMount: function() {
    if (this.props.error) {
      this._showError(this.props.error);
    }
    global.onhashchange = () => {
      if (!this.state.saving || !this.state.forking) {
        Snippet.fetchFromURL().then(
          data => {
            if (data) {
              this._setRevision(data.snippet, data.revision);
            } else {
              this._clearRevision();
            }
          },
          error => this._showError('Failed to fetch revision: ' + error.message)
        );
      }
    };

    global.onbeforeunload = () => {
      if (this.state.initialTransform !== this.state.currentTransform) {
        return 'You have unsaved transform code. Do you really want to leave?';
      }
    };

    var listener = new keypress.Listener();
    listener.simple_combo('meta s', (event) => {
      event.preventDefault();
      this._onSave();
    });
    listener.simple_combo('cmd shift s', (event) => {
      event.preventDefault();
      this._onFork();
    });
    listener.simple_combo('ctrl alt s', (event) => {
      event.preventDefault();
      this._onFork();
    });

    PubSub.subscribe(
      'HIGHLIGHT',
      (_, astNode) => PubSub.publish(
        'CM.HIGHLIGHT',
        getSourceLocationFromASTNode(astNode)
      )
    );
    PubSub.subscribe(
      'CLEAR_HIGHLIGHT',
      (_, astNode) => PubSub.publish(
        'CM.CLEAR_HIGHLIGHT',
        astNode && getSourceLocationFromASTNode(astNode)
      )
   );
  },

  _setCode(code) {
    return {initialCode: code, currentCode: code};
  },

  _setTransform(transform) {
    return {initialTransform: transform, currentTransform: transform};
  },

  _setRevision: function(snippet, revision) {
    if (!snippet || !revision) {
      this.setError('Something went wrong fetching the revision. Try to refresh!');
    }

    const code = revision.get('code') || defaultCode;
    const transform = revision.get('transform') || defaultTransform;

    const update = data => { // eslint-disable-line no-shadow
      this.setState({
        ...data,
        snippet,
        revision,
        ...this._setCode(code),
        ...this._setTransform(transform),
        focusPath: [],
      });
    };

    if (!this.state.snippet ||
        snippet.id !== this.state.snippet.id ||
        revision.id !== this.state.revision.id) {
      if (this.state.revision && code !== this.state.revision.get('code')) {
        this.parse(code).then(
          ast => update({ast, editorError: null}),
          error => update({ast: null, editorError: error})
        );
      } else {
        update({ast: this.state.ast, editorError: null});
      }
    }
  },

  _clearRevision: function() {
    this.parse(defaultCode).then(ast => this.setState({
      ast: ast,
      focusPath: [],
      ...this._setCode(defaultCode),
      ...this._setTransform(defaultTransform),
      snippet: null,
      revision: null,
    }));
  },

  parse: function(code, parser) {
    if (!parser) {
      parser = this.state.parser;
    }

    return new Promise((resolve, reject) => {
      if (parser === 'esprima') {
        try {
          resolve(
            esprima.parse(code, {range: true, sourceType: 'module'})
          );
        } catch(e) {
          reject(e);
        }
      } else {
        loadjs(['./src/babylon'], b => {
          babel = b;
          try {
            resolve(
              babel.parse(code, {ranges: true, sourceType: 'module'})
            );
          } catch(e) {
            reject(e);
          }
        }, reject);
      }
    });
  },

  onContentChange: function({value: code, cursor}) {
    if (this.state.ast && this.state.currentCode === code) {
      return;
    }

    this.parse(code).then(
      ast => this.setState({
        ast: ast,
        currentCode: code,
        focusPath: cursor ? getFocusPath(ast, cursor): [],
        editorError: null,
      }),
      error => this.setState({
        ast: null,
        currentCode: code,
        editorError: error,
      })
    );
  },

  onTransformContentChange: function({value: transform}) {
    this.setState({
      currentTransform: transform,
    });
  },

  onActivity: function(cursorPos) {
    if (this.state.ast) {
      this.setState({
        focusPath: getFocusPath(this.state.ast, cursorPos),
      });
    }
  },

  _showError: function(msg) {
    this.setState({error: msg});
    setTimeout(() => {
      if (msg === this.state.error) {
        this.setState({error: false});
      }
    }, 3000);
  },

  _save: function(fork) {
    var snippet = !fork && this.state.snippet || new Snippet();
    var code = this.refs.editor.getValue();
    var transform = this.refs.transformEditor &&
      this.refs.transformEditor.getValue();
    if (code === defaultCode) {
      code = '';
    }
    if (!transform || transform === defaultTransform) {
      transform = '';
    }
    this.setState({saving: !fork, forking: fork});
    snippet.createNewRevision({code, transform}).then(
      response => {
        if (response) {
          updateHashWithIDAndRevision(snippet.id, response.revisionNumber);
        }
        this.setState({
          saving: false,
          forking: false,
        });
      },
      (_, error) => {
        this._showError('Could not save: ' + error.message);
        this.setState({saving: false, forking: false});
      }
    );
  },

  _onSave: function() {
    const {revision} = this.state;
    var isNewRevision = !revision &&
      (this.state.currentCode !== defaultCode ||
       this.state.currentTransform !== defaultTransform);
    var isModified = revision &&
       (this.state.initalCode !== this.state.currentCode ||
        this.state.initialTransform !== this.state.currentTransform);

    if (isNewRevision || isModified) {
      this._save();
    }
  },

  _onFork: function() {
    if (this.state.revision) {
      this._save(true);
    }
  },

  _onResize: function() {
    PubSub.publish('PANEL_RESIZE');
  },

  _onDropText: function(type, event, text) {
    this.parse(text).then(
      ast => this.setState({
        ...this._setCode(text),
        ast: ast,
        focusPath: [],
        editorError: null,
      }),
      error => this.setState({
        ...this._setCode(text),
        ast: null,
        editorError: error,
      })
    );
  },

  _onDropError: function(type, event, msg) {
    this._showError(msg);
  },

  _onParserChange: function() {
    var parser = this.state.parser === 'esprima' ? 'babel' : 'esprima';

    this.parse(this.state.currentCode, parser).then(
      ast => this.setState({
        ast: ast,
        parser: parser,
        focusPath: [],
        editorError: null,
      }),
      error => this.setState({
        ast: null,
        editorError: error,
        parser: parser,
      })
    );
  },

  _getParserVersion: function() {
    const parser = this.state.parser === 'esprima' ? esprima : babel;
    return parser && parser.version;
  },

  _onToggleTransform: function() {
    const showTransformPanel = !this.state.showTransformPanel;
    // Switch to Babel if we open the transform, since jscodeshift uses Babel
    // as well
    const parser =
      this.state.parser !== 'babel' && showTransformPanel ?
      'babel' :
      this.state.parser;

    if (parser !== this.state.parser) {
      this.parse(this.state.currentCode, parser).then(
        ast => this.setState({
          ast,
          parser,
          focusPath: [],
          editorError: null,
          showTransformPanel,
        }),
        error => this.setState({
          ast: null,
          editError: error,
          parser,
          showTransformPanel,
        })
      );
    } else {
      this.setState({
        showTransformPanel,
        parser,
      });
    }
    this._onResize();
  },

  render: function() {
    const revision = this.state.revision;
    const revisionCode = revision && revision.get('code') || defaultCode;
    const revisionTransform = revision && revision.get('transform') ||
      defaultTransform;
    const canSave = revisionCode !== this.state.currentCode ||
      revisionTransform !== this.state.currentTransform;

    return (
      <PasteDropTarget
        className="dropTarget"
        dropindicator={
          <div className="dropIndicator">
            <div>Drop a JavaScript or (JSON-encoded) AST file here</div>
          </div>
        }
        onText={this._onDropText}
        onError={this._onDropError}>
        <Toolbar
          forking={this.state.forking}
          saving={this.state.saving}
          onSave={this._onSave}
          onFork={this._onFork}
          onParserChange={this._onParserChange}
          onToggleTransform={this._onToggleTransform}
          canSave={canSave}
          canFork={!!revision}
          parserName={this.state.parser}
          parserVersion={this._getParserVersion()}
          transformPanelIsEnabled={this.state.showTransformPanel}
        />
        {this.state.error ? <ErrorMessage message={this.state.error} /> : null}
        <SplitPane
          className="splitpane-content"
          vertical={true}
          onResize={this._onResize}>
          <SplitPane
            className="splitpane"
            onResize={this._onResize}>
            <Editor
              ref="editor"
              defaultValue={this.state.initialCode}
              error={this.state.editorError}
              onContentChange={this.onContentChange}
              onActivity={this.onActivity}
            />
            <ASTOutput
              key={this.state.parser}
              focusPath={this.state.focusPath}
              ast={this.state.ast}
              editorError={this.state.editorError}
            />
          </SplitPane>
          {this.state.showTransformPanel ? <SplitPane
            className="splitpane"
            onResize={this._onResize}>
            <Editor
              ref="transformEditor"
              highlight={false}
              defaultValue={this.state.initialTransform}
              onContentChange={this.onTransformContentChange}
            />
            <TransformOutput
              transform={this.state.currentTransform}
              code={this.state.currentCode}
            />
          </SplitPane> : null}
        </SplitPane>
      </PasteDropTarget>
    );
  },
});

function render(props) {
  React.render(
    <App {...props} />,
    document.getElementById('container')
  );
}

Snippet.fetchFromURL().then(
  data => render(data),
  error => render({error: 'Failed to fetch revision: ' + error.message})
);
