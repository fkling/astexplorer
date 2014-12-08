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
    return this.props.ast !== nextProps.ast ||
      this.props.cursorPos !== nextProps.cursorPos ||
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
              onMouseLeave={function() {PubSub.publish('CM.CLEAR_HIGHLIGHT');}}>
              <Element
                cursorPos={this.props.cursorPos}
                value={this.props.ast}
                level={0}
              />
            </ul>;
          break;
        case 'json':
          output =
            <JSONEditor
              className="container"
              value={JSON.stringify(
                this.props.ast,
                (k,v) => k !== 'loc' ? v : undefined,
                2
              )}
            />;
          break;
      }
    }

    return (
      <div id="output" className="highlight">
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
