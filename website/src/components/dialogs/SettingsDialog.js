import PropTypes from 'prop-types';
import React from 'react';

export default class SettingsDialog extends React.Component {
  constructor(props) {
    super(props);
    this._outerClick = this._outerClick.bind(this);
    this._onChange = this._onChange.bind(this);
    this._reset = this._reset.bind(this);
    this._saveAndClose = this._saveAndClose.bind(this);
    this.state = {
      parserSettings: this.props.parserSettings,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({parserSettings: nextProps.parserSettings});
  }

  _outerClick(event) {
    if (event.target === document.getElementById('SettingsDialog')) {
      this._saveAndClose();
    }
  }

  _onChange(newSettings) {
    this.setState({parserSettings: newSettings});
  }

  _saveAndClose() {
    this.props.onSave(this.props.parser, this.state.parserSettings);
    this.props.onWantToClose();
  }

  _reset() {
    this.setState({parserSettings: {}});
  }

  render() {
    if (this.props.visible && this.props.parser.renderSettings) {
      return (
        <div id="SettingsDialog" className="dialog" onClick={this._outerClick}>
          <div className="inner">
            <div className="header">
              <h3>{this.props.parser.displayName} Settings</h3>
            </div>
            <div className="body">
              {this.props.parser.renderSettings(
                this.state.parserSettings,
                this._onChange,
              )}
            </div>
            <div className="footer">
              <button style={{marginRight: 10}} onClick={this._reset}>
                Reset
              </button>
              <button onClick={this._saveAndClose}>Close</button>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

SettingsDialog.propTypes = {
  onSave: PropTypes.func,
  onWantToClose: PropTypes.func,
  visible: PropTypes.bool,
  parser: PropTypes.object.isRequired,
  parserSettings: PropTypes.object,
};
