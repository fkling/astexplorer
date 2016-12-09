import React from 'react';
import cx from 'classnames';

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
            'fa-code-fork': !forking,
            'fa-lg': true,
            'fa-fw': true,
          })}
        />
        Fork
      </button>
    );
  }
}

ForkButton.propTypes = {
  canFork: React.PropTypes.bool,
  saving: React.PropTypes.bool,
  forking: React.PropTypes.bool,
  onFork: React.PropTypes.func,
};
