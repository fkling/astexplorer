import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/brace-fold';
import PubSub from 'pubsub-js';
import React from 'react/addons';

export default class Editor {

  getValue() {
    return this.codeMirror && this.codeMirror.getValue();
  }

  componentWillReceiveProps(nextProps) {
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
    this._CMHandlers = [];
    this._subscriptions = [];
    this.codeMirror = CodeMirror( // eslint-disable-line new-cap
      this.refs.container.getDOMNode(),
      {
        value: this.props.value,
        mode: {name: 'javascript', json: true},
        readOnly: true,
        lineNumbers: true,
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      }
    );

    if (this.props.onContentChange) {
      this._onContentChange();
    }

    this._subscriptions.push(
      PubSub.subscribe('PANEL_RESIZE', () => {
        if (this.codeMirror) {
          this.codeMirror.refresh();
        }
      })
    );
  }

  componentWillUnmount() {
    this._unbindHandlers();
    let container = this.refs.container.getDOMNode();
    container.removeChild(container.children[0]);
    this.codeMirror = null;
  }

  _bindCMHandler(event, handler) {
    this._CMHandlers.push(event, handler);
    this.codeMirror.on(event, handler);
  }

  _unbindHandlers() {
    let cmHandlers = this._CMHandlers;
    for (let i = 0; i < cmHandlers.length; i += 2) {
      this.codeMirror.off(cmHandlers[i], cmHandlers[i+1]);
    }
  }

  render() {
    return (
      <div id="JSONEditor" className={this.props.className} ref="container" />
    );
  }
}
