import JSONEditor from '../../JSONEditor';
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
