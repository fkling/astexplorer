import PropTypes from 'prop-types';
import React from 'react';

export default function CompactObjectView({keys, onClick}) {
  if (keys.length === 0) {
    return <span className="p">{'{ }'}</span>;
  } else {
    if (keys.length > 5) {
      keys = keys.slice(0, 5).concat([`... +${keys.length - 5}`]);
    }
    return (
      <span>
        <span className="p">{'{'}</span>
        <span className="compact placeholder ge" onClick={onClick}>
          {keys.join(', ')}
        </span>
        <span className="p">{'}'}</span>
      </span>
    );
  }
}

CompactObjectView.propTypes = {
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func,
};
