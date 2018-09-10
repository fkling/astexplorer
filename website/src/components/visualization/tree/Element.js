import CompactArrayView from './CompactArrayView';
import CompactObjectView from './CompactObjectView';
import PropTypes from 'prop-types';
import PubSub from 'pubsub-js';
import React from 'react';
import RecursiveTreeElement from './RecursiveTreeElement';
import {nodeToRange} from '../../getFocusPath';

import cx from 'classnames';
import stringify from '../../../utils/stringify';

/*
// For debugging
function log(f) {
  return function(a, b) {
    let result = f.call(this, a,b);
    console.log(a.name, a.name || a.value && a.value.type, 'Updates', result);
    return result;
  };
}
*/

let lastClickedElement;

let Element = class extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._execFunction = this._execFunction.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);
    this._onMouseOver = this._onMouseOver.bind(this);
    this._toggleClick = this._toggleClick.bind(this);
    const {value, name, deepOpen, parser} = props;
    // Some elements should be open by default
    let open =
      props.open ||
      props.level === 0 ||
      deepOpen ||
      (!!value && parser.opensByDefault(value, name));

    this.state = {
      open,
      deepOpen,
      value,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      open: nextProps.open || nextProps.deepOpen || this.state.open,
      deepOpen: nextProps.deepOpen,
      value: nextProps.value,
    });
  }

  componentWillUnmount() {
    if (lastClickedElement === this) {
      lastClickedElement = null;
    }
  }

  _shouldAutoFocus(thisProps, nextProps) {
    const {focusPath: thisFocusPath} = thisProps;
    const {settings: nextSettings, focusPath: nextFocusPath} = nextProps;

    return (
      thisFocusPath !== nextFocusPath &&
      nextFocusPath.indexOf(nextProps.value) > -1 &&
      nextSettings.autofocus
    );
  }

  componentDidMount() {
    if (this.props.settings.autofocus) {
      this._scrollIntoView();
    }
  }

  componentDidUpdate(prevProps) {
    if (this._shouldAutoFocus(prevProps, this.props)) {
      this._scrollIntoView();
    }
  }

  _scrollIntoView() {
    const {focusPath, value} = this.props;
    if (focusPath.length > 0 && focusPath[focusPath.length -1] === value) {
      setTimeout(() => this.container.scrollIntoView(), 0);
    }
  }

  _toggleClick(event) {
    const shiftKey = event.shiftKey;
    const open = shiftKey || !this.state.open;

    const update  = () => {
      // Make AST node accessible
      if (open) {
        global.$node = this.state.value;
      } else {
        delete global.$node;
      }

      this.setState({
        open,
        deepOpen: shiftKey,
      });
    };
    if (lastClickedElement && lastClickedElement !== this) {
      const element = lastClickedElement;
      lastClickedElement = open ? this : null;
      element.forceUpdate(update);
      return;
    } else {
      lastClickedElement = open ? this : null;
      update();
    }
  }

  _onMouseOver(e) {
    e.stopPropagation();
    const {value} = this.state;
    PubSub.publish(
      'HIGHLIGHT',
      {node: value, range: nodeToRange(this.props.parser, value)}
    );
  }

  _onMouseLeave() {
    const {value} = this.state;
    PubSub.publish(
      'CLEAR_HIGHLIGHT',
      {node: value, range: nodeToRange(this.props.parser, value)}
    );
  }

  _isFocused(level, path, value, open) {
    return level !== 0 &&
      path.indexOf(value) > -1 &&
      (!open || path[path.length - 1] === value);
  }

  _getProperties(parser, value) {
    const {hideFunctions, hideEmptyKeys, hideLocationData, hideTypeKeys} = this.props.settings;
    let properties = [...parser.forEachProperty(value)];
    return properties
      .filter(({value}) => !hideFunctions || typeof value !== 'function')
      .filter(({value}) => !hideEmptyKeys || value != null)
      .filter(({key}) => !hideLocationData || !parser.locationProps.has(key))
      .filter(({key}) => !hideTypeKeys || key !== 'type');
  }

  _execFunction() {
    let state = {error: null};
    try {
      state.value = this.state.value.call(this.props.parent);
      console.log(state.value); // eslint-disable-line no-console
    } catch(err) {
      console.error(`Unable to run "${this.props.name}": `, err.message); // eslint-disable-line no-console
      state.error = err;
    }
    this.setState(state);
  }

  _createSubElement(key, value, name, computed) {
    return (
      <Element
        key={key}
        name={name}
        focusPath={this.props.focusPath}
        deepOpen={this.state.deepOpen}
        value={value}
        computed={computed}
        level={this.props.level + 1}
        parser={this.props.parser}
        settings={this.props.settings}
        parent={this.props.value}
      />
    );
  }

  render() {
    const {
      focusPath,
      parser,
      level,
    } = this.props;
    const {
      open,
      value,
    } = this.state;
    const focused = this._isFocused(level, focusPath, value, open);
    let valueOutput = null;
    let content = null;
    let prefix = null;
    let suffix = null;
    let showToggler = false;
    let enableHighlight = false;

    if (value && typeof value === 'object') {
      if (!Array.isArray(value)) {
        const nodeName = parser.getNodeName(value);
        if (nodeName) {
          valueOutput =
            <span className="tokenName nc" onClick={this._toggleClick}>
              {nodeName}{' '}
              {lastClickedElement === this ?
                <span className="ge" style={{fontSize: '0.8em'}}>
                  {' = $node'}
                </span> :
                null
              }
            </span>
        }
        enableHighlight = parser.nodeToRange(value) && level !== 0;
      } else {
        enableHighlight = true;
      }

      if (typeof value.length === 'number') {
        if (value.length > 0 && open) {
          prefix = '[';
          suffix = ']';
          let elements = this._getProperties(parser, value)
            .filter(({key}) => key !== 'length')
            .map(({key, value, computed}) => this._createSubElement(
              key,
              value,
              Number.isInteger(+key) ? undefined : key,
              computed
            ));
          content = <ul className="value-body">{elements}</ul>;
        } else {
          valueOutput =
            <span>
              {valueOutput}
              <CompactArrayView
                array={value}
                onClick={this._toggleClick}
              />
            </span>;
        }
        showToggler = value.length > 0;
      } else {
        if (open) {
          prefix = '{';
          suffix = '}';
          let elements = this._getProperties(parser, value)
            .map(({key, value, computed}) => this._createSubElement(
              key,
              value,
              key,
              computed
            ));
          content = <ul className="value-body">{elements}</ul>;
          showToggler = elements.length > 0;
        } else {
          let keys = this._getProperties(parser, value)
            .map(({key}) => key);
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
      }
    } else if (typeof value === 'function') {
      valueOutput =
        <span
          className="ge invokeable"
          title="Click to invoke function"
          onClick={this._execFunction}>
          (...)
        </span>;
      showToggler = false;
    } else {
      valueOutput = <span className="s">{stringify(value)}</span>;
      showToggler = false;
    }

    let name = this.props.name ?
      <span
        className="key"
        onClick={
          showToggler ?
            this._toggleClick :
            null
        }>
        <span className="name nb">
          {this.props.computed ?
            <span title="computed">*{this.props.name}</span> :
            this.props.name
          }
        </span>
        <span className="p">:&nbsp;</span>
      </span> :
      null;

    let classNames = cx({
      entry: true,
      focused,
      toggable: showToggler,
      open,
    });
    return (
      <li
        ref={c => this.container = c}
        className={classNames}
        onMouseOver={enableHighlight ? this._onMouseOver : null}
        onMouseLeave={enableHighlight ? this._onMouseLeave : null}>
        {name}
        <span className="value">
          {valueOutput}
        </span>
        {prefix ? <span className="prefix p">&nbsp;{prefix}</span> : null}
        {content}
        {suffix ? <div className="suffix p">{suffix}</div> : null}
        {this.state.error  ?
          <span>
            {' '}
            <i
              title={this.state.error.message}
              className="fa fa-exclamation-triangle"
            />
          </span> :
          null
        }
      </li>
    );
  }
};

Element.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
  computed: PropTypes.bool,
  open: PropTypes.bool,
  deepOpen: PropTypes.bool,
  focusPath: PropTypes.array.isRequired,
  level: PropTypes.number,
  parser: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  parent: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

export default (Element = RecursiveTreeElement(Element));
