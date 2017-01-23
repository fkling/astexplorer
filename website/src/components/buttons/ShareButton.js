import React from 'react';

export default function ShareButton({onShareButtonClick, snippet}) {
  return (
    <button
      type="button"
      disabled={!snippet}
      onClick={onShareButtonClick}>
      <i className="fa fa-share fa-fw" />&nbsp;Share...
    </button>
  );
}

ShareButton.propTypes = {
  onShareButtonClick: React.PropTypes.func.isRequired,
  snippet: React.PropTypes.object,
};
