/**
 * @jsx React.DOM
 */
"use strict";

require('./Object.es7.shim');

var ASTOutput = require('./ASTOutput');
var Editor = require('./Editor');
var ErrorMessage = require('./ErrorMessage');
var PubSub = require('pubsub-js');
var React = require('react/addons');
var Snippet = require('./Snippet');
var SplitPane = require('./SplitPane');
var Toolbar = require('./Toolbar');

var getFocusPath = require('./getFocusPath');
var escodegen = require('escodegen');
var esprima = require('esprima-fb');
var fs = require('fs');

var initialCode = fs.readFileSync(__dirname + '/codeExample.txt', 'utf8');

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
      revision: revision,
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

    PubSub.subscribe('HIGHLIGHT', function(_, astNode) {
      PubSub.publish('CM.HIGHLIGHT', astNode.range);
    });
    PubSub.subscribe('CLEAR_HIGHLIGHT', function(_, astNode) {
      PubSub.publish('CM.CLEAR_HIGHLIGHT', astNode && astNode.range);
    });

    // Handle pastes
    global.document.addEventListener('paste', event => {
      if (!event.clipboardData) {
        // No browser support? :(
        return;
      }
      var cbdata = event.clipboardData;
      // Plain text
      if (cbdata.types.indexOf('text/plain') > -1) {
        try {
          this._handlePastedText(cbdata.getData('text/plain'));
          event.preventDefault();
          event.stopPropagation();
        } catch(ex) {
          if (event.target.nodeName !== 'TEXTAREA') {
            this._showError('Cannot process pasted AST: ' + ex.message);
            throw ex;
          }
        }
      }
    });

    var acceptedFileTypes = {
      'text/javascript': true,
      'application/json': true,
      'text/plain': true
    };

    // Handle file drops
    global.document.body.addEventListener('dragover', event => {
      event.preventDefault();
    });
    global.document.body.addEventListener('drop', event => {
      var files = event.dataTransfer.files;
      var type = files[0].type;
      if (!acceptedFileTypes[type]) {
        return;
      }
      event.preventDefault();
      var reader = new FileReader();
      reader.onload = event => {
        var text = event.target.result;
        switch (type) {
          case 'text/javascipt':
            this.onContentChange({value: text});
            break;
          case 'application/json':
            this._handlePastedText(text);
            break;
          default:
            // JSON AST ?
            try {
              this._handlePastedText(event.target.result);
            } catch(e) {
              // Just replace the content with whatever it's in the file
              this.onContentChange({value: event.target.result});
            }
            break;
        }
      };
      reader.readAsText(files[0]);
    });
  },

  _handlePastedText: function(text) {
    var ast = JSON.parse(text);
    var code = escodegen.generate(ast, {format:{indent:{ style: '  '}}});
    this.onContentChange({value: code});
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
    this.setState({
      ast: esprima.parse(initialCode, {range: true}),
      focusPath: [],
      content: initialCode,
      snippet: null,
      revision: null,
    });
  },

  onContentChange: function(data) {
    var content = data.value;
    var cursor = data.cursor;
    if (this.state.ast && this.state.content === content) {
      return;
    }

    var ast;
    try {
      ast = esprima.parse(content, {range: true});
    }
    catch(e) {
      this.setState({
        error: 'Syntax error: ' + e.message,
        content: content,
      });
    }

    if (ast) {
      this.setState({
        content: content,
        ast: ast,
        focusPath: cursor ? getFocusPath(ast, cursor): [],
        error: null
      });
    }
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
    this._save();
  },

  _onFork: function() {
    this._save(true);
  },

  _onResize: function() {
    PubSub.publish('PANEL_RESIZE');
  },

  render: function() {
    var revision = this.state.revision;
    return (
      <div>
        <Toolbar
          forking={this.state.forking}
          saving={this.state.saving}
          onSave={this._onSave}
          onFork={this._onFork}
          canSave={
            this.state.content !== initialCode && !revision ||
            revision && revision.get('code') !== this.state.content
          }
          canFork={!!revision}
        />
        {this.state.error ? <ErrorMessage message={this.state.error} /> : null}
        <SplitPane
          className="splitpane"
          onResize={this._onResize}>
          <Editor
            ref="editor"
            value={this.state.content}
            onContentChange={this.onContentChange}
            onActivity={this.onActivity}
          />
          <ASTOutput focusPath={this.state.focusPath} ast={this.state.ast} />
        </SplitPane>
      </div>
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
