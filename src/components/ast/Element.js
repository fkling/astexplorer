import CompactArrayView from './CompactArrayView';
import CompactObjectView from './CompactObjectView';
import PubSub from 'pubsub-js';
import React from 'react';
import RecursiveTreeElement from './RecursiveTreeElement';

import cx from 'classnames';
import stringify from '../../utils/stringify';

const {PropTypes} = React;

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

@RecursiveTreeElement
export default class Element extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.any.isRequired,
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

  constructor(props, context) {
    super(props, context);
    this._execFunction = this._execFunction.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);
    this._onMouseOver = this._onMouseOver.bind(this);
    this._toggleClick = this._toggleClick.bind(this);
    const {value, name, deepOpen, parser, focusPath, settings} = props;
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

  componentWillReceiveProps(nextProps) {
    this.setState({
      open: nextProps.open || nextProps.deepOpen || this.state.open,
      deepOpen: nextProps.deepOpen,
      value: nextProps.value,
    });
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
      setTimeout(() => {
        const node = React.findDOMNode(this);
        node.scrollIntoView();
      }, 0);
    }
  }

  _toggleClick(event) {
    // Make AST node accessible
    global.$node = this.state.value;

    this.setState({
      open: event.shiftKey || !this.state.open,
      deepOpen: event.shiftKey,
    });
  }

  _onMouseOver(e) {
    e.stopPropagation();
    PubSub.publish('HIGHLIGHT', this.state.value);
  }

  _onMouseLeave() {
    PubSub.publish('CLEAR_HIGHLIGHT', this.state.value);
  }

  _isFocused(level, path, value, open) {
    return level !== 0 &&
      path.indexOf(value) > -1 &&
      (!open || path[path.length - 1] === value);
  }

  _getProperties(parser, value) {
    const {hideFunctions, hideEmptyKeys} = this.props.settings;
    let properties = [...parser.forEachProperty(value)];
    return properties
      .filter(({value}) => !hideFunctions || typeof value !== 'function')
      .filter(({value}) => !hideEmptyKeys || value != null);
  }

  _execFunction() {
    let state = {error: null};
    try {
      state.value = this.state.value.call(this.props.parent);
      console.log(state.value);
    } catch(err) {
      console.error(`Unable to run "${this.props.name}": `, err.message);
      state.error = err;
    }
    this.setState(state);
  }

  _createSubElement(key, value, name) {
    return (
      <Element
        key={key}
        name={name}
        focusPath={this.props.focusPath}
        deepOpen={this.state.deepOpen}
        value={value}
        level={this.props.level + 1}
        parser={this.props.parser}
        settings={this.props.settings}
        parent={value}
      />
    );
  }

  render() {
    const {
      focusPath,
      parser,
      level,
      settings,
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
              {nodeName}
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
            .map(({key, value}) => this._createSubElement(key, value, Number.isInteger(+key) ? undefined : key));
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
            .map(({key, value}) => this._createSubElement(key, value, key));
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
            (typeof value === 'function' ?
              this._execFunction :
              null
            )
        }>
        <span className="name nb">{this.props.name}</span>
        <span className="p">: </span>
      </span> :
      null;

    let classNames = cx({
      entry: true,
      focused,
      toggable: showToggler,
      open,
      func: typeof value === 'function',
    });
    return (
      <li
        ref="container"
        className={classNames}
        onMouseOver={enableHighlight ? this._onMouseOver : null}
        onMouseLeave={enableHighlight ? this._onMouseLeave : null}>
        {name}
        <span
          className="value"
          onClick={typeof value === 'function' ? this._execFunction : null}>
            {valueOutput}
        </span>
        {prefix ? <span className="prefix p"> {prefix}</span> : null}
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
}
