import CodeMirror from 'codemirror';
import PubSub from 'pubsub-js';
import React from 'react';

export default class Editor extends React.Component {

  getValue() {
    return this.codeMirror && this.codeMirror.getValue();
  }

  _getErrorLine(error) {
    return error.loc ? error.loc.line : (error.lineNumber || error.line);
  }

  _setError(error) {
    if (this.codeMirror) {
      let oldError = this.props.error;
      if (oldError) {
        let lineNumber = this._getErrorLine(oldError);
        if (lineNumber) {
          this.codeMirror.removeLineClass(lineNumber-1, 'text', 'errorMarker');
        }
      }

      if (error) {
        let lineNumber = this._getErrorLine(error);
        if (lineNumber) {
          this.codeMirror.addLineClass(lineNumber-1, 'text', 'errorMarker');
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultValue !== this.props.defaultValue) {
      this.codeMirror.setValue(nextProps.defaultValue);
    }
    if (nextProps.mode !== this.props.mode) {
      this.codeMirror.setOption('mode', nextProps.mode);
    }
    this._setError(nextProps.error);
  }

  shouldComponentUpdate() {
    return false;
  }

  _posFromIndex(doc, index) {
    return (this.props.posFromIndex ? this.props : doc).posFromIndex(index);
  }

  componentDidMount() {
    this._CMHandlers = [];
    this._subscriptions = [];
    this.codeMirror = CodeMirror( // eslint-disable-line new-cap
      this.refs.container,
      {
        value: this.props.defaultValue,
        mode: this.props.mode,
        lineNumbers: this.props.lineNumbers,
        readOnly: this.props.readOnly,
      }
    );

    this._bindCMHandler('changes', () => {
      clearTimeout(this._updateTimer);
      this._updateTimer = setTimeout(this._onContentChange.bind(this, true), 200);
    });
    this._bindCMHandler('cursorActivity', () => {
      clearTimeout(this._updateTimer);
      this._updateTimer = setTimeout(this._onActivity.bind(this, true), 100);
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
        PubSub.subscribe('HIGHLIGHT', (_, {range}) => {
          if (!range) {
            return;
          }
          let doc = this.codeMirror.getDoc();
          this._markerRange = range;
          // We only want one mark at a time.
          if (this._mark) {
            this._mark.clear();
          }
          let [start, end] = range.map(index => this._posFromIndex(doc, index));
          if (!start || !end) {
            this._markerRange = this._mark = null;
            return;
          }
          this._mark = this.codeMirror.markText(
            start,
            end,
            {className: 'marked'}
          );
        }),

        PubSub.subscribe('CLEAR_HIGHLIGHT', (_, {range}={}) => {
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
    clearTimeout(this._updateTimer);
    this._unbindHandlers();
    this._markerRange = null;
    this._mark = null;
    let container = this.refs.container;
    container.removeChild(container.children[0]);
    this.codeMirror = null;
  }

  _bindCMHandler(event, handler) {
    this._CMHandlers.push(event, handler);
    this.codeMirror.on(event, handler);
  }

  _unbindHandlers() {
    const cmHandlers = this._CMHandlers;
    for (let i = 0; i < cmHandlers.length; i += 2) {
      this.codeMirror.off(cmHandlers[i], cmHandlers[i+1]);
    }
    this._subscriptions.forEach(token => {
      PubSub.unsubscribe(token);
    });
  }

  _onContentChange(withCursor) {
    const doc = this.codeMirror.getDoc();
    const args = {
      value: doc.getValue(),
    };
    if (withCursor) {
      args.cursor = doc.indexFromPos(doc.getCursor());
    }
    this.props.onContentChange(args);
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
Editor.propTypes = {
  defaultValue: React.PropTypes.string,
  highlight: React.PropTypes.bool,
  lineNumbers: React.PropTypes.bool,
  readOnly: React.PropTypes.bool,
  onContentChange: React.PropTypes.func,
  onActivity: React.PropTypes.func,
  posFromIndex: React.PropTypes.func,
  error: React.PropTypes.object,
  mode: React.PropTypes.string,
};

Editor.defaultProps = {
  highlight: true,
  lineNumbers: true,
  readOnly: false,
  mode: 'javascript',
  onContentChange: () => {},
  onActivity: () => {},
};
