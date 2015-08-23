import React from 'react';
import * as parsers from './parsers';
import pubSub from 'pubsub-js';

function noop() {}

export default class SettingsDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show: false};

    this._show = this._toggleVisibility.bind(this, true);
    this._hide = this._toggleVisibility.bind(this, false);
    this._onChange = this._onChange.bind(this);
    this._outerClick = this._outerClick.bind(this);
  }

  componentDidMount() {
    pubSub.subscribe('PARSER.SHOW_SETTINGS', this._show);
  }

  _toggleVisibility(show) {
    this.setState({
      show,
    });
  }

  _outerClick(event) {
    if (event.target === document.getElementById('SettingsDialog')) {
      this._onChange();
    }
  }

  _onChange() {
    this._hide();
    this.props.onChange();
  }

  render() {
    if (this.state.show) {
      let settings = (parsers[this.props.parserName].renderSettings || noop)();
      return (
        <div id="SettingsDialog" onClick={this._outerClick}>
          <div className="inner">
            <div className="header">
              <h3>{this.props.parserName} Settings</h3>
            </div>
            <div className="body">
              {settings}
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}
