import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/brace-fold';
import PropTypes from 'prop-types';
import {subscribe, clear} from '../utils/pubsub.js';
import React from 'react';

export default class Editor extends React.Component {

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.codeMirror.getValue()) {
      // preserve scroll position
      let info = this.codeMirror.getScrollInfo();
      this.codeMirror.setValue(nextProps.value);
      this.codeMirror.scrollTo(info.left, info.top);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    this._subscriptions = [];
    this.codeMirror = CodeMirror( // eslint-disable-line new-cap
      this.container,
      {
        value: this.props.value,
        mode: {name: 'javascript', json: true},
        readOnly: true,
        lineNumbers: true,
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      },
    );

    this._subscriptions.push(
      subscribe('PANEL_RESIZE', () => {
        if (this.codeMirror) {
          this.codeMirror.refresh();
        }
      }),
    );
  }

  componentWillUnmount() {
    this._unbindHandlers();
    let container = this.container;
    container.removeChild(container.children[0]);
    this.codeMirror = null;
  }

  _unbindHandlers() {
    clear(this._subscriptions);
  }

  render() {
    return (
      <div id="JSONEditor" className={this.props.className} ref={c => this.container = c}/>
    );
  }
}

Editor.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
};
