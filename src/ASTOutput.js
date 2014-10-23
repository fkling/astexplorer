/**
 * @jsx React.DOM
 */
"use strict";

var Element = require('./Element');
var PubSub = require('pubsub-js');
var React = require('react/addons');

var ASTOutput = React.createClass({
  propTypes: {
    ast: React.PropTypes.object,
    focusPath: React.PropTypes.array,
  },

  shouldComponentUpdate: function(nextProps) {
    var newFocusPath = nextProps.focusPath;

    return this.props.ast !== nextProps.ast ||
      this.props.focusPath.length !== newFocusPath.length ||
      this.props.focusPath.some(function(obj, i) {
        return obj !== newFocusPath[i];
      });
  },

  render: function() {
    var tree = null;
    if (this.props.ast) {
      tree =
        <Element
          focusPath={this.props.focusPath}
          value={this.props.ast}
          level={0}
        />;
    }
    return (
      <ul
        id="AST"
        className="highlight"
        onMouseLeave={function() {PubSub.publish('CM.CLEAR_HIGHLIGHT');}}>
        {tree}
      </ul>
    );
  }
});

module.exports = ASTOutput;
