/*eslint no-new-func: 0*/
import Editor from './Editor';
import JSONEditor from './JSONEditor';
import PropTypes from 'prop-types';
import * as React from 'react';

import stringify from 'json-stringify-safe';

function positionFromIndex(index, map) {
  if (!map) {
    return;
  }
  const src = map.sourcesContent[0];
  if (index === 0) {
    return { line: 0, ch: 0 };
  }
  let lineStart = src.lastIndexOf('\n', index - 1);
  let column = index - lineStart - 1;
  let line = 1;
  while (lineStart > 0) {
      lineStart = src.lastIndexOf('\n', lineStart - 1);
        line++;
  }
  if (lineStart === 0) {
        line++;
  }
  ({ line, column } = map.generatedPositionFor({
    line,
    column,
    source: map.sources[0],
  }));
  if (line === null || column === null) {
    return;
  }
  return { line: line - 1, ch: column };
}

export default function TransformOutput({transformResult, mode}) {
  // This ensures that we are rendering an empty editor as "placeholder" if no transform result is available yet.
  transformResult = transformResult == null ? {result: ''} : transformResult;

  const posFromIndex = React.useCallback(
    index => positionFromIndex(index, transformResult.map),
    [transformResult],
  );

  return (
    <div className="output highlight">
      {transformResult.error ?
        <Editor
          highlight={false}
          key="error"
          lineNumbers={false}
          readOnly={true}
          value={transformResult.error.message}
        /> : (
          typeof transformResult.result === 'string' ?
          <Editor
            posFromIndex={posFromIndex}
            mode={mode}
            key="output"
            readOnly={true}
            value={transformResult.result}
          /> :
          <JSONEditor
            className="container no-toolbar"
            value={stringify(transformResult.result, null, 2)}
          />
        )
      }
    </div>
  );
}

TransformOutput.propTypes = {
  transformResult: PropTypes.object,
  mode: PropTypes.string,
};
