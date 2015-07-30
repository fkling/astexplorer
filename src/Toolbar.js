import React from 'react';
import cx from 'classnames';

export default class Toolbar {
  static propTypes = {
    saving: React.PropTypes.bool,
    forking: React.PropTypes.bool,
    onSave: React.PropTypes.func,
    onFork: React.PropTypes.func,
    onParserChange: React.PropTypes.func,
    parserName: React.PropTypes.string,
    parserVersion: React.PropTypes.string,
  };

  render() {
    return (
      <div id="Toolbar">
        <h1>JS AST Explorer</h1>
        <button
          type="button"
          disabled={
            !this.props.canSave || this.props.saving || this.props.forking
          }
          onClick={this.props.onSave}>
          <i
            className={cx({
              fa: true,
              'fa-spinner': this.props.saving,
              'fa-floppy-o': !this.props.saving,
              'fa-lg': true,
              'fa-fw': true,
            })}
          />
          Save
        </button>
        <button
          type="button"
          disabled={
            !this.props.canFork || this.props.saving || this.props.forking
          }
          onClick={this.props.onFork}>
          <i
            className={cx({
              fa: true,
              'fa-spinner': this.props.forking,
              'fa-code-fork': !this.props.forking,
              'fa-lg': true,
              'fa-fw': true,
            })}
          />
          Fork
        </button>
        <button
          title="Click to toggle between esprima and babel"
          type="button"
          onClick={this.props.onParserChange}>
          <i
            className={cx({
              fa: true,
              'fa-lg': true,
              'fa-code': true,
              'fa-fw': true,
            })}
          />
          &nbsp;{this.props.parserName}
        </button>
        <button
          type="button"
          onClick={this.props.onToggleTransform}>
          <i
            className={cx({
              fa: true,
              'fa-lg': true,
              'fa-toggle-off': !this.props.transformPanelIsEnabled,
              'fa-toggle-on': this.props.transformPanelIsEnabled,
              'fa-fw': true,
            })}
          />
          &nbsp;Transform
        </button>
        <div id="parser">
          Parser: {this.props.parserName}-{this.props.parserVersion}
        </div>
      </div>
    );
  }
}
