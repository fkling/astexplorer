/**
 * @jsx React.DOM
 */
"use strict";

var ArrayElements = React.createClass({
  getDefaultProps: function() {
    return {
      array: [],
    };
  },

  render: function() {
    var Element = require('./Element');
    /* jshint ignore:start */
    var elements = this.props.array.map(function(v) {
      return <Element value={v} />;
    }, this);
    return <div>{elements}</div>;
    /* jshint ignore:end */
  }
});

module.exports = ArrayElements;
