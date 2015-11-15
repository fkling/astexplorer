import PubSub from 'pubsub-js';
import React from 'react';
import cx from 'classnames';
import visualizations from './components/visualization';

const {PropTypes} = React;

export default React.createClass({
  propTypes: {
    ast: React.PropTypes.object,
    focusPath: React.PropTypes.array.isRequired,
    parser: PropTypes.object.isRequired,
  },

  getInitialState: function() {
    return {
      output: 0,
    };
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    var newFocusPath = nextProps.focusPath;

    return this.props.editorError !== nextProps.editorError ||
      this.props.ast !== nextProps.ast ||
      this.props.focusPath.length !== newFocusPath.length ||
      this.props.focusPath.some((obj, i) => obj !== newFocusPath[i]) ||
      this.state.output !== nextState.output ||
      this.state.parser !== nextState.parser;
  },

  _changeOutput: function(event) {
    this.setState({output: event.target.value});
  },

  render: function() {
    var output;
    if (this.props.ast) {
      output = React.createElement(
        visualizations[this.state.output],
        this.props
      );
    } else if (this.props.editorError) {
      output =
        <div style={{padding: 20}}>
          {this.props.editorError.message}
        </div>;
    }

    var buttons = visualizations.map(
      (cls, index) =>
        <button
          key={index}
          value={index}
          onClick={this._changeOutput}
          className={cx({
            active: this.state.output == index,
          })}>
          {cls.name}
        </button>
    );

    return (
      <div className="output highlight">
        <div className="toolbar">{buttons}</div>
        {output}
      </div>
    );
  },
});
