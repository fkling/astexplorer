import React from 'react';

function noop() {}

export default class SettingsDialog extends React.Component {
  constructor(props) {
    super(props);
    this._outerClick = this._outerClick.bind(this);
  }

  _outerClick(event) {
    if (event.target === document.getElementById('SettingsDialog')) {
      this.props.onChange();
      this.props.onWantToClose();
    }
  }

  render() {
    if (this.props.visible) {
      let settings = (this.props.parser.renderSettings || noop)();
      return (
        <div id="SettingsDialog" onClick={this._outerClick}>
          <div className="inner">
            <div className="header">
              <h3>{this.props.parser.displayName} Settings</h3>
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

SettingsDialog.propTypes = {
  onChange: React.PropTypes.func,
  onWantToClose: React.PropTypes.func,
  visible: React.PropTypes.bool,
  parser: React.PropTypes.object,
};
