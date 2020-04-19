import PropTypes from 'prop-types';
import React from 'react';
import cx from '../../utils/classnames.js';

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
  canSave: PropTypes.bool,
  saving: PropTypes.bool,
  forking: PropTypes.bool,
  onSave: PropTypes.func,
};
