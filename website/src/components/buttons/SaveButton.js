import React from 'react';
import cx from 'classnames';

export default function SaveButton({canSave, saving, forking, onSave}) {
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
          'fa-pulse': saving,
          'fa-floppy-o': !saving,
          'fa-fw': true,
        })}
      />&nbsp;Save
    </button>
  );
}

SaveButton.propTypes = {
  canSave: React.PropTypes.bool,
  saving: React.PropTypes.bool,
  forking: React.PropTypes.bool,
  onSave: React.PropTypes.func,
};
