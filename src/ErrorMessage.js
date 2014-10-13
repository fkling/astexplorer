/**
 * @jsx React.DOM
 */
"use strict";

var React = require('react/addons');

var ErrorMessage = React.createClass({
  render: function() {
    /* jshint ignore:start */
    return <div id="Error">{this.props.message}</div>;
    /* jshint ignore:end */
  }
});

module.exports = ErrorMessage;
