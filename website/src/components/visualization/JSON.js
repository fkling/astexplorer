import JSONEditor from '../JSONEditor';
import PropTypes from 'prop-types';
import React from 'react';

import stringify from 'json-stringify-safe';

export default function JSON({parseResult}) {
  return (
    <JSONEditor
      className="container"
      value={stringify(parseResult.ast, null, 2)}
    />
  );
}

JSON.propTypes = {
  parseResult: PropTypes.object,
};
