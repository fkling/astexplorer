/**
 * @jsx React.DOM
 */
"use strict";

var ErrorMessage = React.createClass({
  render: function() {
    /* jshint ignore:start */
    return (
      <div id="Error">
        Syntax error: {this.props.message}
      </div>
    );
    /* jshint ignore:end */
  }
});

module.exports = ErrorMessage;
