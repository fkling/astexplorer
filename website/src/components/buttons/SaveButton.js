import React from 'react';
import cx from 'classnames';

export default class SaveButton extends React.Component {
  render() {
    const { canSave, saving, forking, onSave } = this.props;
    return (
      <button
        type="button"
        disabled={
          !canSave || saving || forking
        }
        onClick={onSave}>
        <i
          className={cx({
            fa: true,
            'fa-spinner': saving,
            'fa-floppy-o': !saving,
            'fa-lg': true,
            'fa-fw': true,
          })}
        />
        Save
      </button>
    );
  }
}

SaveButton.propTypes = {
  canSave: React.PropTypes.bool,
  saving: React.PropTypes.bool,
  forking: React.PropTypes.bool,
  onSave: React.PropTypes.func,
};
