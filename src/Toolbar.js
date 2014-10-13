/**
 * @jsx React.DOM
 */
"use strict";

var React = require('react/addons');
var cx = React.addons.classSet;

var Toolbar = React.createClass({
  propTypes: {
    saving: React.PropTypes.bool,
    forking: React.PropTypes.bool,
    onSave: React.PropTypes.func,
    onFork: React.PropTypes.func,
  },

  render: function() {
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
          disabled={this.props.saving || this.props.forking}
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
      </div>
    );
  },
});

module.exports = Toolbar;
