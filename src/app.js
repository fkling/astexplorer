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
import esprima from 'esprima-fb';
import {keypress} from 'keypress';

var fs = require('fs');

var babel;
var initialCode = fs.readFileSync(__dirname + '/codeExample.txt', 'utf8');
var initialTransform =
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
    const code = revision && revision.get('code') || initialCode;
    const transform = revision && revision.get('transform') || initialTransform;
    const showTransform = transform !== initialTransform;
    return {
      forking: false,
      saving: false,
      ast: null,
      focusPath: [],
      content: code,
      transform,
      snippet: snippet,
      showTransformPanel: transform !== initialTransform,
      revision: revision,
      parser: showTransform ? 'babel' : 'esprima-fb',
    };
  },

  componentDidMount: function() {
    if (this.props.error) {
      this._showError(this.props.error);
    }
    global.onhashchange = () => {
      if (!this.state.saving || !this.state.forking) {
        Snippet.fetchFromURL().then(
          function(data) {
            if (data) {
              this._setRevision(data.snippet, data.revision);
            } else {
              this._clearRevision();
            }
          }.bind(this),
          function(error) {
            this._showError('Failed to fetch revision: ' + error.message);
          }.bind(this)
        );
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
      (_, astNode) => PubSub.publish('CM.HIGHLIGHT', astNode.range)
    );
    PubSub.subscribe(
      'CLEAR_HIGHLIGHT',
     (_, astNode) => PubSub.publish(
       'CM.CLEAR_HIGHLIGHT',
       astNode && astNode.range
     )
   );
  },

  _setRevision: function(snippet, revision) {
    if (!snippet || !revision) {
      this.setError('Something went wrong fetching the revision. Try to refresh!');
    }
    if (!this.state.snippet ||
        snippet.id !== this.state.snippet.id ||
        revision.id !== this.state.revision.id ||
        revision.get('code') !== this.state.revision.get('code') ||
        revision.get('transform') !== this.state.revision.get('transform')) {
      this.setState({
        snippet,
        revision,
        content: revision.get('code') || initialCode,
        transform: revision.get('transform') || initialTransform,
        focusPath: [],
      });
    }
  },

  _clearRevision: function() {
    this.parse(initialCode).then(ast => this.setState({
      ast: ast,
      focusPath: [],
      content: initialCode,
      transform: initialTransform,
      snippet: null,
      revision: null,
    }));
  },

  parse: function(code, parser) {
    if (!parser) {
      parser = this.state.parser;
    }

    return new Promise((resolve, reject) => {
      if (parser === 'esprima-fb') {
        try {
          resolve(
            esprima.parse(code, {range: true, sourceType: 'module'})
          );
        } catch(e) {
          reject(e);
        }
      } else {
        loadjs(['babel-core'], b => {
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

  onContentChange: function(data) {
    var content = data.value;
    var cursor = data.cursor;
    if (this.state.ast && this.state.content === content) {
      return;
    }

    this.parse(content).then(
      ast => this.setState({
        content: content,
        ast: ast,
        focusPath: cursor ? getFocusPath(ast, cursor): [],
        error: null,
      }),
      e => this.setState({
        error: 'Syntax error: ' + e.message,
        content: content,
      })
    );
  },

  onTransformContentChange: function(data) {
    this.setState({
      transform: data.value,
    });
  },

  onActivity: function(cursorPos) {
    this.setState({
      focusPath: getFocusPath(this.state.ast, cursorPos),
    });
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
    var transform = this.refs.transformEditor.getValue();
    if (snippet.get('code') === code &&
        snippet.get('transform') === transform) {
      return;
    }
    if (code === initialCode) {
      code = '';
    }
    if (transform === initialTransform) {
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
      (this.state.content !== initialCode ||
       this.state.transform !== initialTransform);
    var isModified = revision &&
       (revision.get('code') !== this.state.content ||
        revision.get('transform') !== this.state.transform);

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
    this.onContentChange({value: text});
  },

  _onDropError: function(type, event, msg) {
    this._showError(msg);
  },

  _onParserChange: function() {
    var parser = this.state.parser === 'esprima-fb' ? 'babel' : 'esprima-fb';

    this.parse(this.state.content, parser).then(
      ast => this.setState({
        ast: ast,
        parser: parser,
        focusPath: [],
        error: null,
      }),
      e => this.setState({
        error: 'Syntax error: ' + e.message,
        parser: parser,
      })
    );
  },

  _getParserVersion: function() {
    const parser = this.state.parser === 'esprima-fb' ? esprima : babel;
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
      this.parse(this.state.content, parser).then(
        ast => this.setState({
          ast,
          parser,
          focusPath: [],
          error: null,
          showTransformPanel,
        }),
        error => this.setState({
          error: 'Syntax error: ' + error.message,
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
    var revision = this.state.revision;
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
          canSave={
            (this.state.content !== initialCode ||
             this.state.transform !== initialTransform) && !revision ||
            revision && revision.get('code') !== this.state.content ||
            revision && revision.get('transform') !== this.state.transform
          }
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
              value={this.state.content}
              onContentChange={this.onContentChange}
              onActivity={this.onActivity}
            />
            <ASTOutput
              key={this.state.parser}
              focusPath={this.state.focusPath}
              ast={this.state.ast}
            />
          </SplitPane>
          {this.state.showTransformPanel ? <SplitPane
            className="splitpane"
            onResize={this._onResize}>
            <Editor
              ref="transformEditor"
              highlight={false}
              value={this.state.transform}
              onContentChange={this.onTransformContentChange}
            />
            <TransformOutput
              transform={this.state.transform}
              code={this.state.content}
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
