import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import visualizations from './visualization';
import getFocusPath from './getFocusPath';

const {useState, useMemo} = React;

function formatTime(time) {
  if (!time) {
    return null;
  }
  if (time < 1000) {
    return `${time}ms`;
  }
  return `${(time / 1000).toFixed(2)}s`;
}

export default function ASTOutput({parser, parseResult={}, cursor=null}) {
  const [selectedOutput, setSelectedOutput] = useState(0);
  const {ast=null} = parseResult;

  const focusPath = useMemo(
    () => ast && cursor != null ?
      getFocusPath(parseResult.ast, cursor, parser) :
      [],
    [ast, cursor, parser],
  );

  let output;

  if (parseResult.error) {
    output =
      <div style={{padding: 20}}>
        {parseResult.error.message}
      </div>;
  } else if (ast) {
    output = React.createElement(
      visualizations[selectedOutput],
      {parseResult, focusPath}
    );
  }

  let buttons = visualizations.map(
    (cls, index) =>
      <button
        key={index}
        value={index}
        onClick={event => setSelectedOutput(event.target.value)}
        className={cx({
          active: selectedOutput == index,
        })}>
        {cls.name}
      </button>
  );

  return (
    <div className="output highlight">
      <div className="toolbar">
        {buttons}
        <span className="time">
          {formatTime(parseResult.time)}
        </span>
      </div>
      {output}
    </div>
  );
}

ASTOutput.propTypes = {
  parser: PropTypes.object.isRequired,
  parseResult: PropTypes.object,
  cursor: PropTypes.any,
};

