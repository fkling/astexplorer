/**
 * @jsx React.DOM
 */
"use strict";

var Element = require('./Element');

var ASTOutput = React.createClass({
  propTypes: {
    ast: React.PropTypes.object,
    focusPath: React.PropTypes.array,
  },
  render: function() {
    /* jshint ignore:start */
    var tree = null;
    if (this.props.ast) {
      tree =
        <Element
          focusPath={this.props.focusPath}
          value={this.props.ast}
          open={true}
          level={0}
        />;
    }
    return (
      <div
        id="AST"
        className="highlight"
        onMouseLeave={function() {global.cmClearHighlight()}}>
        {tree}
      </div>
    );
    /* jshint ignore:end */
  }
});

module.exports = ASTOutput;
