import PropTypes from 'prop-types';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import React from "react";
import Editor from "./Editor";
import PubSub from "pubsub-js";

export default class JSCodeshiftEditor extends React.Component {
  render() {
    return (
      <div className="editor"
           ref={c => this.container = c}/>
    );
  }

  componentDidMount() {
    this._subscriptions = [];

    var editor = monaco.editor.create(this.container, {
      minimap: {enabled: false},
      value: this.props.value,
      language: 'javascript',

    });

    editor.onDidChangeModelContent(() => {
      clearTimeout(this._updateTimer);
      console.log(editor.value);
      this._updateTimer = setTimeout(() => this.props.onContentChange({value: editor.getValue(), cursor: null}), 200);
    });

    this._subscriptions.push(
      PubSub.subscribe('PANEL_RESIZE', () => editor.layout())
    );
  }

  componentWillUnmount() {
    clearTimeout(this._updateTimer);
    this._unbindHandlers();
  }

  _unbindHandlers() {
    this._subscriptions.forEach(PubSub.unsubscribe);
  }
}

JSCodeshiftEditor.propTypes = {
  value: PropTypes.string,
  highlight: PropTypes.bool,
  lineNumbers: PropTypes.bool,
  readOnly: PropTypes.bool,
  onContentChange: PropTypes.func,
  onActivity: PropTypes.func,
  posFromIndex: PropTypes.func,
  error: PropTypes.object,
  mode: PropTypes.string,
  keyMap: PropTypes.string,
};

JSCodeshiftEditor.defaultProps = Object.assign(
  {},
  Editor.defaultProps,
  {
    highlight: false,
  }
);
