import PropTypes from 'prop-types';
import React from 'react';

export default function SaveButton({saving, forking, onNew}) {
  return (
    <button
      type="button"
      disabled={saving || forking}
      onClick={onNew}>
      <i className="fa fa-file-o fa-fw" />&nbsp;New
    </button>
  );
}

SaveButton.propTypes = {
  saving: PropTypes.bool,
  forking: PropTypes.bool,
  onNew: PropTypes.func,
};

