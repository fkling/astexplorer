import React from 'react';

export default function ParserSettingsButton(props) {
  let settings = props.parser.renderSettings;
  return (
    <button
      type="button"
      disabled={!settings}
      onClick={props.onParserSettingsButtonClick}>
      <i className="fa fa-cog fa-fw" />
      &nbsp;Parser Settings
    </button>
  );
}

ParserSettingsButton.propTypes = {
  parser: React.PropTypes.object,
  onParserSettingsButtonClick: React.PropTypes.func,
};
