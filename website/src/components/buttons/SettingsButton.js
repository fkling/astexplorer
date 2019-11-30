import React from 'react';
import PropTypes from 'prop-types';

export default class SettingsButton extends React.Component {
  render() {
    return (
      <div className="button menuButton" onClick={this.props.onClick}>
        <span>⚙️</span>
      </div>
    );
  }
}

SettingsButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
