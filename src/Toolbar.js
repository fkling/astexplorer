import React from 'react';
import cx from 'classnames';
import ParserButton from './ParserButton';
import * as parsers from './parsers';

export default class Toolbar {
  static propTypes = {
    saving: React.PropTypes.bool,
    forking: React.PropTypes.bool,
    onSave: React.PropTypes.func,
    onFork: React.PropTypes.func,
    onParserChange: React.PropTypes.func,
    parserName: React.PropTypes.string,
  };

  render() {
    let parser = parsers[this.props.parserName];
    let parserInfo = this.props.parserName;
    if (parser) {
      if (parser.version) {
        parserInfo += '-' + parser.version;
      }
      if (parser.homepage) {
        parserInfo =
          <a href={parser.homepage} target="_blank">{parserInfo}</a>;
      }
    }
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
        <ParserButton {...this.props} />
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
        <a
          target="_blank"
          href="https://github.com/fkling/esprima_ast_explorer#features">
          <i
            className={cx({
              fa: true,
              'fa-lg': true,
              'fa-question': true,
              'fa-fw': true,
            })}
          />
          Help
        </a>
        <div id="parser">
          Parser: {parserInfo}
        </div>
      </div>
    );
  }
}
