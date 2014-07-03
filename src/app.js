/**
 * @jsx React.DOM
 */
"use strict";

var ASTOutput = require('./ASTOutput');
var Editor = require('./Editor');
var ErrorMessage = require('./ErrorMessage');
var getFocusPath = require('./getFocusPath');

var esprima = require('esprima-fb');

var App = React.createClass({
  onContentChange: function(content) {
    var ast;
    try {
      ast = esprima.parse(content, {loc: true});
    }
    catch(e) {
      this.setState({
        error: e.message
      });
    }

    if (ast) {
      this.setState({
        ast: ast,
        error: null
      });
    }
  },

  onActivity: function(cursorPos) {
    var focus = {line: cursorPos.line + 1, column: cursorPos.ch};
    this.setState({
      focusPath: getFocusPath(this.state.ast, focus)
    });
  },

  getInitialState: function() {
    return {
      ast: null,
      focusPath: [],
    };
  },

  render: function() {
    /* jshint ignore:start */
    return (
      <div>
        {this.state.error ? <ErrorMessage message={this.state.error} /> : null}
        <Editor
          onContentChange={this.onContentChange}
          onActivity={this.onActivity}
        />
        <ASTOutput focusPath={this.state.focusPath} ast={this.state.ast} />
      </div>
    );
    /* jshint ignore:end */
  }
});

/* jshint ignore:start */
React.renderComponent(<App />, document.getElementById('container'));
/* jshint ignore:end */
