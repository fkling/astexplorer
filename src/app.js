var ASTOutput = require('./ASTOutput');
var Editor = require('./Editor');
var ErrorMessage = require('./ErrorMessage');
var PasteDropTarget = require('./PasteDropTarget');
var PubSub = require('pubsub-js');
var React = require('react/addons');
var Snippet = require('./Snippet');
var SplitPane = require('./SplitPane');
var Toolbar = require('./Toolbar');
var TransformOutput = require('./TransformOutput');

var babel;
var getFocusPath = require('./getFocusPath');
var esprima = require('esprima-fb');
var fs = require('fs');
var keypress = require('keypress').keypress;

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
    return {
      forking: false,
      saving: false,
      ast: null,
      focusPath: [],
      content: revision && revision.get('code') || initialCode,
      snippet: snippet,
      showTransformPanel: false,
      transformContent: initialTransform,
      revision: revision,
      parser: 'esprima-fb',
    };
  },

  componentDidMount: function() {
    if (this.props.error) {
      this._showError(this.props.error);
    }
    global.onhashchange = function() {
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
    }.bind(this);

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

    PubSub.subscribe('HIGHLIGHT', function(_, astNode) {
      PubSub.publish('CM.HIGHLIGHT', astNode.range);
    });
    PubSub.subscribe('CLEAR_HIGHLIGHT', function(_, astNode) {
      PubSub.publish('CM.CLEAR_HIGHLIGHT', astNode && astNode.range);
    });
  },

  _setRevision: function(snippet, revision) {
    if (!snippet || !revision) {
      this.setError('Something went wrong fetching the revision. Try to refresh!');
    }
    if (!this.state.snippet ||
        snippet.id !== this.state.snippet.id ||
        revision.id !== this.state.revision.id ||
        revision.get('code') !== this.state.revision.get('code')) {
      this.setState({
        snippet: snippet,
        revision: revision,
        content: revision.get('code'),
        focusPath: []
      });
    }
  },

  _clearRevision: function() {
    this.parse(initialCode).then(ast => this.setState({
      ast: ast,
      focusPath: [],
      content: initialCode,
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
        error: null
      }),
      e => this.setState({
        error: 'Syntax error: ' + e.message,
        content: content,
      })
    );
  },

  onTransformContentChange: function(data) {
    var content = data.value;
    this.setState({
      transformContent: content
    });
  },

  onActivity: function(cursorPos) {
    this.setState({
      focusPath: getFocusPath(this.state.ast, cursorPos)
    });
  },

  _showError: function(msg) {
    this.setState({error: msg});
    setTimeout(function() {
      if (msg === this.state.error) {
        this.setState({error: false});
      }
    }.bind(this), 3000);
  },

  _save: function(fork) {
    var snippet = !fork && this.state.snippet || new Snippet();
    var code = this.refs.editor.getValue();
    if (snippet.get('code') === code) return;
    this.setState({saving: !fork, forking: fork});
    snippet.createNewRevision({code: code}).then(
      function(response) {
        if (response) {
          updateHashWithIDAndRevision(snippet.id, response.revisionNumber);
        }
        this.setState({
          saving: false,
          forking: false,
        });
      }.bind(this),
      function(snippet, error) {
        this._showError('Could not save: ' + error.message);
        this.setState({saving: false, forking: false});
      }.bind(this)
    );
  },

  _onSave: function() {
    var revision = this.state.revision;
    if (this.state.content !== initialCode && !revision ||
        revision && revision.get('code') !== this.state.content) {
      this._save();
    }
  },

  _onFork: function() {
    if (!!this.state.revision) {
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
        error: null
      }),
      e => this.setState({
        error: 'Syntax error: ' + e.message,
        parser: parser,
      })
    );
  },

  _getParser: function() {
    return this.state.parser === 'esprima-fb' ? esprima : babel;
  },

  _onToggleTransform: function() {
    this.setState({
      showTransformPanel: !this.state.showTransformPanel,
    });
  },

  render: function() {
    var revision = this.state.revision;
    var splitPaneClassName =
      'splitpane' + (this.state.showTransformPanel ? ' splitpane-top' : '');
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
            this.state.content !== initialCode && !revision ||
            revision && revision.get('code') !== this.state.content
          }
          canFork={!!revision}
          parserName={this.state.parser}
          parserVersion={this._getParser().version}
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
              highlight={false}
              value={this.state.transformContent}
              onContentChange={this.onTransformContentChange}
            />
            <TransformOutput
              transform={this.state.transformContent}
              code={this.state.content}
            />
          </SplitPane> : null}
        </SplitPane>
      </PasteDropTarget>
    );
  }
});

function render(props) {
  React.render(
    <App {...props} />,
    document.getElementById('container')
  );
}

Snippet.fetchFromURL().then(
  function(data) {
    render(data);
  },
  function(error) {
    render({error: 'Failed to fetch revision: ' + error.message});
  }
);
