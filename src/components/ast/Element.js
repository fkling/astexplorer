import CompactArrayView from './CompactArrayView';
import CompactObjectView from './CompactObjectView';
import PubSub from 'pubsub-js';
import React from 'react';

import cx from 'classnames';

const {PropTypes} = React;

/*
// For debugging
function log(f) {
  return function(a, b) {
    var result = f.call(this, a,b);
    console.log(a.name, a.name || a.value && a.value.type, 'Updates', result);
    return result;
  };
}
*/

const Element = React.createClass({
  propTypes: {
    name: PropTypes.string,
    value: PropTypes.any.isRequired,
    deepOpen: PropTypes.bool,
    focusPath: PropTypes.array.isRequired,
    level: PropTypes.number,
    parser: PropTypes.object.isRequired,
  },

  getInitialState: function() {
    const {value, name, deepOpen, parser} = this.props;
    // Some elements should be open by default
    var open =
      this.props.level === 0 ||
      deepOpen ||
      (!!value && parser.opensByDefault(value, name));

    return {
      open: open && (!deepOpen || parser.opensOnDeepOpen(value, name)),
      deepOpen,
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      open: nextProps.deepOpen || this.state.open,
      deepOpen: nextProps.deepOpen,
    });
  },

  _toggleClick: function(event) {
    // Make AST node accessible
    global.$node = this.props.value;

    this.setState({
      open: event.shiftKey || !this.state.open,
      deepOpen: event.shiftKey && this.props.parser.opensOnDeepOpen(
        this.props.value,
        this.props.name
      ),
    });
  },

  _onMouseOver: function(e) {
    e.stopPropagation();
    PubSub.publish('HIGHLIGHT', this.props.value);
  },

  _onMouseLeave: function() {
    PubSub.publish('CLEAR_HIGHLIGHT', this.props.value);
  },

  _isFocused: function(level, path, value, open) {
    return level !== 0 &&
      path.indexOf(value) > -1 &&
      (!open || path[path.length - 1] === value);
  },

  _renderAdditionalInfo() {
  },

  render: function() {
    const {
      value,
      focusPath,
      parser,
      level,
    } = this.props;
    const open = this.state.open;
    const focused = this._isFocused(level, focusPath, value, open);
    let valueOutput = null;
    let content = null;
    let prefix = null;
    let suffix = null;
    let showToggler = false;
    let enableHighlight = false;

    if (Array.isArray(value)) {
      if (value.length > 0 && open) {
        prefix = '[';
        suffix = ']';
        var elements = value.map(
          (v, i) =>
            <Element
              key={i}
              focusPath={focusPath}
              deepOpen={this.state.deepOpen}
              value={v}
              level={this.props.level + 1}
              parser={parser}
            />
        );
        content = <ul className="value-body">{elements}</ul>;
      } else {
        valueOutput =
          <CompactArrayView
            array={value}
            onClick={this._toggleClick}
          />;
      }
      showToggler = value.length > 0;
    } else if (value && typeof value === 'object') {
      enableHighlight = parser.nodeToRange(value) && this.props.level !== 0;

      const nodeName = parser.getNodeName(value);

      if (nodeName) {
        valueOutput =
          <span className="tokenName nc" onClick={this._toggleClick}>
            {nodeName}
          </span>
      }

      if (this.state.open) {
        prefix = ' {';
        suffix = '}';
        let elements = [];
        parser.forEachProperty(
          value,
          ({value, key}) => {
            elements.push(
              <Element
                key={key}
                name={key}
                focusPath={focusPath}
                deepOpen={this.state.deepOpen}
                value={value}
                level={level + 1}
                parser={parser}
              />
            );
          });
        content = <ul className="value-body">{elements}</ul>;
        showToggler = elements.length > 0;
      } else {
        let keys = [];
        parser.forEachProperty(value, ({key}) => keys.push(key));
        valueOutput =
          <span>
            {valueOutput}
            <CompactObjectView
              onClick={this._toggleClick}
              keys={keys}
            />
          </span>;
        showToggler = keys.length > 0;
      }
    } else {
      let encodedValue;
      switch (typeof value) {
        case 'function':
          encodedValue = value.toString().match(/function[^(]*\([^)]*\)/)[0];
          break;
        case 'undefined':
          encodedValue = 'undefined';
          break;
        default:
          encodedValue = JSON.stringify(value);
      }

      valueOutput =
        <span className="s">
          {encodedValue}
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
      toggable: showToggler,
      open: open,
      func: typeof value === 'function',
    });
    var additionalInfo = this._renderAdditionalInfo();
    return (
      <li
        ref="container"
        className={classNames}
        onMouseOver={enableHighlight ? this._onMouseOver : null}
        onMouseLeave={enableHighlight ? this._onMouseLeave : null}>
        {additionalInfo ?
          <span className="ge">
            {' ('}
            {additionalInfo}
            {') '}
          </span> :
          null
        }
        {name}
        <span className="value">{valueOutput}</span>
        {prefix ? <span className="prefix p">{prefix}</span> : null}
        {content}
        {suffix ? <div className="suffix p">{suffix}</div> : null}
      </li>
    );
  },
});

export default Element;
