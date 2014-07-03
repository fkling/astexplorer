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
    var focusPath = this.props.focusPath;
    var level = this.props.level + 1;
    var focusElement = focusPath[level];
    var lastFocusElement = focusPath[focusPath.length - 1];

    /* jshint ignore:start */
    var elements = this.props.array.map(function(v) {
      return <Element
        focusPath={focusPath}
        value={v}
        open={v === focusElement}
        focused={v === lastFocusElement}
        level={level}
      />;
    }, this);
    return <div>{elements}</div>;
    /* jshint ignore:end */
  }
});

module.exports = ArrayElements;
