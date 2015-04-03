/**
 * @jsx React.DOM
 */
"use strict";

var JSONEditor = require('./JSONEditor');
var Element = require('./Element');
var PubSub = require('pubsub-js');
var React = require('react/addons');

var cx = React.addons.classSet;

var ASTOutput = React.createClass({
  propTypes: {
    ast: React.PropTypes.object,
    focusPath: React.PropTypes.array,
  },

  getInitialState: function() {
    return {
      output: 'tree'
    };
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    var newFocusPath = nextProps.focusPath;

    return this.props.ast !== nextProps.ast ||
      this.props.focusPath.length !== newFocusPath.length ||
      this.props.focusPath.some((obj, i) => obj !== newFocusPath[i]) ||
      this.state.output !== nextState.output;
  },

  _changeOutput: function(event) {
    this.setState({output: event.target.value});
  },

  render: function() {
    var output;
    if (this.props.ast) {
      switch (this.state.output) {
        case 'tree':
          output =
            <ul
              id="tree"
              className="container"
              onMouseLeave={function() {PubSub.publish('CLEAR_HIGHLIGHT');}}>
              <Element
                focusPath={this.props.focusPath}
                value={this.props.ast}
                level={0}
              />
            </ul>;
          break;
        case 'json':
          output =
            <JSONEditor
              className="container"
              value={JSON.stringify(this.props.ast, null, 2)}
            />;
          break;
      }
    }

    return (
      <div className="output highlight">
        <div className="toolbar">
          <button
            onClick={this._changeOutput}
            value="tree"
            className={cx({
              active: this.state.output === 'tree'
            })}>
            Tree
          </button>
          <button
            onClick={this._changeOutput}
            value="json"
            className={cx({
              active: this.state.output === 'json'
            })}>
            JSON
          </button>
        </div>
        {output}
      </div>
    );
  }
});

module.exports = ASTOutput;
