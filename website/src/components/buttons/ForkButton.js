import PropTypes from 'prop-types';
import React from 'react';
import cx from '../../utils/classnames.js';

export default class ForkButton extends React.Component {
  render() {
    const { canFork, saving, forking, onFork } = this.props;
    return (
      <button
        type="button"
        disabled={
          !canFork || saving || forking
        }
        onClick={onFork}>
        <i
          className={cx({
            fa: true,
            'fa-spinner': forking,
            'fa-pulse': forking,
            'fa-code-fork': !forking,
            'fa-fw': true,
          })}
        />&nbsp;Fork
      </button>
    );
  }
}

ForkButton.propTypes = {
  canFork: PropTypes.bool,
  saving: PropTypes.bool,
  forking: PropTypes.bool,
  onFork: PropTypes.func,
};
