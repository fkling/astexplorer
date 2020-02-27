import PropTypes from 'prop-types';
import React from 'react';

export default class SettingsDrawer extends React.Component {
  constructor(props) {
    super(props);
    this._expand = this._expand.bind(this);
    this._collapse = this._collapse.bind(this);
  }

  _expand() {
    this.props.onWantToExpand();
  }

  _collapse() {
    this.props.onWantToCollapse();
  }

  render() {
    return (
      this.props.isOpen ? 
        <div className='settings-drawer__expanded'>
          <h3>Settings</h3>
          <button onClick={this._collapse}>Close</button>
        </div>
      : 
        <div className='settings-drawer__collapsed' onClick={this._expand}></div>
    );
  }
}

SettingsDrawer.propTypes = {
  onWantToExpand: PropTypes.func,
  onWantToCollapse: PropTypes.func,
  isOpen: PropTypes.bool,
};
