/**
 * @jsx React.DOM
 */
"use strict";

var ArrayElements = require('./ArrayElements');
var ArrayFormatter = require('./ArrayFormatter');
var ObjectFormatter = require('./ObjectFormatter');
var PropertyList = require('./PropertyList');
var PubSub = require('pubsub-js');
var React = require('react/addons');
var TokenName = require('./TokenName');

var cx = React.addons.classSet;

function isArray(v) {
  return Object.prototype.toString.call(v) === '[object Array]';
}

var Element = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    value: React.PropTypes.any,
    open: React.PropTypes.bool,
    focused: React.PropTypes.bool,
    focusPath: React.PropTypes.array,
    level: React.PropTypes.number,
  },

  getInitialState: function() {
    // Some elements should be open by default
    var open = this.props.open || this.props.name === 'body';
    return {
      open: open
    };
  },

  componentWillReceiveProps: function(props) {
    this.setState({
      open: this.state.open || props.open
    });
  },

  _toggleClick: function() {
    this.setState({open: !this.state.open});
  },

  _onMouseOver: function(e) {
    e.stopPropagation();
    var loc = this.props.value.loc;
    PubSub.publish('CM.HIGHLIGHT', {
      from: {line: loc.start.line - 1, ch: loc.start.column},
      to: {line: loc.end.line - 1, ch: loc.end.column}
    });
  },

  _onMouseOut: function(e) {
    e.stopPropagation();
    PubSub.publish('CM.CLEAR_HIGHLIGHT');
  },

  render: function() {
    /* jshint ignore:start */
    var value = this.props.value;
    var value_output = null;
    var content = null;
    var prefix = null;
    var suffix = null;
    var showToggler = true;
    var isType = value && value.type;
    var enableHighlight = isType && value.type !== 'Program';
    var level = this.props.level;
    var focusPath = this.props.focusPath;
    var focused = level < focusPath.length && value === focusPath[level];
    var isLastElementInPath = isType && value === focusPath[focusPath.length- 1];
    var open = this.state.open;

    if (isArray(value)) {
      content =
        <ArrayElements
          focusPath={focusPath}
          array={value}
          level={level + 1}
        />;
      if (value.length > 0 && open) {
        prefix = "[";
        suffix = "]";
      } else {
        value_output = <ArrayFormatter array={value} />;
        showToggler = value.length > 0;
      }
    }
    else if (value && typeof value === "object") {
      var valueIsType = !!value.type;
      content =
        <PropertyList
          focusPath={focusPath}
          object={value}
          level={level + 1}
        />;
      if (this.state.open) {
        if (isType) {
          value_output =
            <TokenName
              onClick={this._toggleClick}
              object={value}
            />;
        }
        prefix = ' {';
        suffix = '}';
      }
      else {
        value_output =
          <ObjectFormatter
            onClick={this._toggleClick}
            object={value}
          />;
      }
    }
    else {
      value_output =
        <span className="s">
          {typeof value === 'undefined' ? 'undefined' : JSON.stringify(value)}
      </span>;
      showToggler = false;
    }

    var name = this.props.name ?
      <span
        className="key"
        onClick={showToggler ? this._toggleClick : null}>
        <span className="name nb">{this.props.name}</span>
        <span className="p">: </span>
      </span> :
      null;

    var classNames = cx({
      entry: true,
      focused: focused,
      lastFocused: isLastElementInPath,
      toggable: showToggler,
      open: open
    });

    return (
      <li
        ref="container"
        className={classNames}
        onMouseOver={enableHighlight ? this._onMouseOver : null}
        onMouseOut={enableHighlight ? this._onMouseOut : null}>
        {name}
        <span className="value">{value_output}</span>
        {prefix ? <span className="prefix p">{prefix}</span> : null}
        <ul className="value-body" style={{display: this.state.open ? 'block' : 'none'}}>{content}</ul>
        {suffix ? <div className="suffix p">{suffix}</div> : null}
      </li>
    );
    /* jshint ignore:end */
  }
});

module.exports = Element;
