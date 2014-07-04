/**
 * @jsx React.DOM
 */
"use strict";

var React = require('react/addons');

var ArrayElements = React.createClass({
  getDefaultProps: function() {
    return {
      array: [],
    };
  },

  render: function() {
    var Element = require('./Element');
    var focusPath = this.props.focusPath;
    var level = this.props.level;

    /* jshint ignore:start */
    var elements = this.props.array.map(function(v) {
      return <Element
        focusPath={focusPath}
        value={v}
        level={level}
      />;
    }, this);
    return <div>{elements}</div>;
    /* jshint ignore:end */
  }
});

module.exports = ArrayElements;
