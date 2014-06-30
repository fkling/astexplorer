/**
 * @jsx React.DOM
 */
"use strict";

var TokenName = React.createClass({
  _onClick: function() {
    var loc = this.props.object.loc;
    global.cmHighlight(
      {line: loc.start.line - 1, ch: loc.start.column},
      {line: loc.end.line - 1, ch: loc.end.column}
    );
  },

  render: function() {
    return <span className="tokenName nc" onClick={this._onClick}>
      {this.props.object.type}
    </span>;
  }
});

module.exports = TokenName;
