import React from 'react';

export default function LoadingIndicator(props) {
  return (
    <div
      className="loadingIndicator cover"
      style={{display: props.visible ? 'flex' : 'none'}}>
      <div>
        <i className="fa fa-lg fa-circle-o-notch fa-spin"></i>
      </div>
    </div>
  );
}

LoadingIndicator.propTypes = {
  visible: React.PropTypes.bool,
};
