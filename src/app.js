/**
 * @jsx React.DOM
 */
"use strict";

var ASTOutput = require('./ASTOutput');
var Editor = require('./Editor');
var ErrorMessage = require('./ErrorMessage');

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

  getInitialState: function() {
    return {
      ast: null
    };
  },

  render: function() {
    /* jshint ignore:start */
    return (
      <div>
        {this.state.error ? <ErrorMessage message={this.state.error} /> : null}
        <Editor onContentChange={this.onContentChange} />
        <ASTOutput ast={this.state.ast} />
      </div>
    );
    /* jshint ignore:end */
  }
});

/* jshint ignore:start */
React.renderComponent(<App />, document.getElementById('container'));
/* jshint ignore:end */
