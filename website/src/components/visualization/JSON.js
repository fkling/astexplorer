import JSONEditor from '../JSONEditor';
import PropTypes from 'prop-types';
import React from 'react';

import stringify from 'json-stringify-safe';

export default class JSON extends React.Component {
  render() {
    return (
      <JSONEditor
        className="container"
        value={stringify(this.props.ast, null, 2)}
      />
    );
  }
}

JSON.propTypes = {
  ast: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
};
