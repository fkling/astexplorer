import PropTypes from 'prop-types';
import React from 'react';

export default class ShareDialog extends React.Component {
  constructor(props) {
    super(props);
    this._outerClick = this._outerClick.bind(this);
  }

  _outerClick(event) {
    if (event.target === document.getElementById('ShareDialog')) {
      this.props.onWantToClose();
    }
  }

  render() {
    if (this.props.visible) {
      return (
        <div id="ShareDialog" className="dialog" onClick={this._outerClick}>
          <div className="inner" style={{maxWidth: '80%', width: 600}}>
            <div className="body">
              {this.props.snippet.getShareInfo()}
            </div>
            <div className="footer">
              <button onClick={this.props.onWantToClose}>Close</button>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

ShareDialog.propTypes = {
  onWantToClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  snippet: PropTypes.object,
};
