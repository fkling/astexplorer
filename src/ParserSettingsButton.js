import React from 'react';
import * as parsers from './parsers';
import pubSub from 'pubsub-js';

export default class ParserSettingsButton extends React.Component {
  _show() {
    pubSub.publish('PARSER.SHOW_SETTINGS');
  }

  render() {
    let settings = this.props.parser.renderSettings;
    return (
      <button
        type="button"
        disabled={!settings}
        onClick={this._show}>
        <i className="fa fa-cog fa-fw" />
        &nbsp;Parser Settings
      </button>
    );
  }
}
