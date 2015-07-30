import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import PubSub from 'pubsub-js';
import React from 'react/addons';
import {keypress} from 'keypress';

export default class Editor {
  static propTypes = {
    defaultValue: React.PropTypes.string,
    highlight: React.PropTypes.bool,
    lineNumbers: React.PropTypes.bool,
    readOnly: React.PropTypes.bool,
  }

  static defaultProps = {
    highlight: true,
    lineNumbers: true,
    readOnly: false,
    onContentChange: () => {},
    onActivity: () => {}
  };

  getValue() {
    return this.codeMirror && this.codeMirror.getValue();
  }

  _setError(error) {
    if (this.codeMirror) {
      if (this.props.error) {
        let lineNumber = this.props.error.loc ?
          this.props.error.loc.line :
          this.props.error.lineNumber;
        this.codeMirror.removeLineClass(lineNumber-1, 'text', 'errorMarker');
      }

      if (error) {
        let lineNumber = error.loc ? error.loc.line : error.lineNumber;
        this.codeMirror.addLineClass(lineNumber-1, 'text', 'errorMarker');
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultValue !== this.props.defaultValue) {
      this.codeMirror.setValue(nextProps.defaultValue);
    }
    this._setError(nextProps.error);
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    this._CMHandlers = [];
    this._subscriptions = [];
    this.codeMirror = CodeMirror( // eslint-disable-line new-cap
      React.findDOMNode(this.refs.container),
      {
        value: this.props.defaultValue,
        lineNumbers: this.props.lineNumbers,
        readOnly: this.props.readOnly,
      }
    );

    if (this.props.onContentChange) {
      this._onContentChange();
    }

    this._bindCMHandler('changes', () => {
      clearTimeout(this._updateTimer);
      this._updateTimer = setTimeout(this._onContentChange.bind(this), 200);
    });
    this._bindCMHandler('cursorActivity', () => {
      clearTimeout(this._updateTimer);
      this._updateTimer = setTimeout(this._onActivity.bind(this), 100);
    });

    this._keyListener = new keypress.Listener();
    this._keyListener.simple_combo('meta z', event => {
      if (event.target !== 'TEXTAREA') {
        this.codeMirror.execCommand('undo');
      }
    });

    this._subscriptions.push(
      PubSub.subscribe('PANEL_RESIZE', () => {
        if (this.codeMirror) {
          this.codeMirror.refresh();
        }
      })
    );

    if (this.props.highlight) {
      this._markerRange = null;
      this._mark = null;
      this._subscriptions.push(
        PubSub.subscribe('CM.HIGHLIGHT', (_, range) => {
          var doc = this.codeMirror.getDoc();
          this._markerRange = range;
          // We only want one mark at a time.
          if (this._mark) {
            this._mark.clear();
          }
          this._mark = this.codeMirror.markText(
            doc.posFromIndex(range[0]),
            doc.posFromIndex(range[1]),
            {className: 'marked'}
          );
        }),

        PubSub.subscribe('CM.CLEAR_HIGHLIGHT', (_, range) => {
          if (!range ||
            this._markerRange &&
            range[0] === this._markerRange[0] &&
            range[1] === this._markerRange[1]
          ) {
            this._markerRange = null;
            if (this._mark) {
              this._mark.clear();
              this._mark = null;
            }
          }
        })
      );
    }

    if (this.props.error) {
      this._setError(this.props.error);
    }
  }

  componentWillUnmount() {
    this._unbindHandlers();
    this._markerRange = null;
    this._mark = null;
    var container = this.refs.container.getDOMNode();
    container.removeChild(container.children[0]);
    this.codeMirror = null;
  }

  _bindCMHandler(event, handler) {
    this._CMHandlers.push(event, handler);
    this.codeMirror.on(event, handler);
  }

  _unbindHandlers() {
    var cmHandlers = this._CMHandlers;
    for (var i = 0; i < cmHandlers.length; i += 2) {
      this.codeMirror.off(cmHandlers[i], cmHandlers[i+1]);
    }
    this._subscriptions.forEach(function(token) {
      PubSub.unsubscribe(token);
    });
  }

  _onContentChange() {
    var doc = this.codeMirror.getDoc();
    this.props.onContentChange({
      value: doc.getValue(),
      cursor: doc.indexFromPos(doc.getCursor()),
    });
  }

  _onActivity() {
    this.props.onActivity(
      this.codeMirror.getDoc().indexFromPos(this.codeMirror.getCursor())
    );
  }

  render() {
    return (
      <div className="editor" ref="container" />
    );
  }
}

module.exports = Editor;
