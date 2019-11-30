import PropTypes from 'prop-types';
import React from 'react';
import SettingsButton from './buttons/SettingsButton';

export default class Toolbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="Toolbar">
        <h1>AST Explorer</h1>
        <SettingsButton onClick={this.props.onSettingsButtonClick} />
      </div>
    );
  }
}

Toolbar.propTypes = {
  saving: PropTypes.bool,
  forking: PropTypes.bool,
  onSave: PropTypes.func,
  onFork: PropTypes.func,
  onParserChange: PropTypes.func,
  onParserSettingsButtonClick: PropTypes.func,
  onShareButtonClick: PropTypes.func,
  onTransformChange: PropTypes.func,
  onKeyMapChange: PropTypes.func,
  onSettingsButtonClick: PropTypes.func,
  parser: PropTypes.object,
  transformer: PropTypes.object,
  showTransformer: PropTypes.bool,
  canSave: PropTypes.bool,
  canFork: PropTypes.bool,
};
