import React from 'react';
import cx from 'classnames';

export default function PrettierButton(props) {
  return (<button type="button"
            className="toggleBtn"
            onClick={props.toggleFormatting}>
          <i
            className={cx({
              fa: true,
              'fa-lg': true,
              'fa-toggle-off': !props.enableFormatting,
              'fa-toggle-on': props.enableFormatting,
              'fa-fw': true,
            })}
          />
          <span className="btnText">Prettier</span>
      </button>);
}

PrettierButton.propTypes = {
  toggleFormatting: React.PropTypes.func,
  enableFormatting: React.PropTypes.bool,
}