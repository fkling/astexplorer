import PubSub from 'pubsub-js';
import React from 'react';
import cx from 'classnames';
import visualizations from './components/visualization';

const {PropTypes} = React;

export default class extends React.Component {
  static propTypes = {
    ast: React.PropTypes.object,
    focusPath: React.PropTypes.array.isRequired,
    parser: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this._changeOutput = this._changeOutput.bind(this);

    this.state = {
      output: 0,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    var newFocusPath = nextProps.focusPath;

    return this.props.editorError !== nextProps.editorError ||
      this.props.ast !== nextProps.ast ||
      this.props.focusPath.length !== newFocusPath.length ||
      this.props.focusPath.some((obj, i) => obj !== newFocusPath[i]) ||
      this.state.output !== nextState.output ||
      this.state.parser !== nextState.parser;
  }

  _changeOutput(event) {
    this.setState({output: event.target.value});
  }

  render() {
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
  }
}
