import PropTypes from 'prop-types';
import React from 'react';

export default class SettingsDrawer extends React.Component {
  constructor(props) {
    super(props);
    this._outerClick = this._outerClick.bind(this);
    this._close = this._close.bind(this);
  }

  _outerClick(event) {
    if (event.target === document.getElementById('SettingsDrawer')) {
      this._close();
    }
  }

  _close() {
    this.props.onWantToClose();
  }

  /* Ideas
    Themes
    window layout
    Parser, transformer etc with explanations and links to repo, info etc
    Keybindings
  */

  render() {
    if (this.props.visible) {
      return (
        <div id="SettingsDrawer" className="dialog" onClick={this._outerClick}>
          <div className="inner">
            <div className="header">
              <h3>Settings</h3>
            </div>
            <div className="body">Hello body</div>
            <div className="footer">
              <button onClick={this._close}>Close</button>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

SettingsDrawer.propTypes = {
  onWantToClose: PropTypes.func,
  visible: PropTypes.bool,
};
