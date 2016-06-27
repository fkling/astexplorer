import CodeMirror from 'codemirror';
import PubSub from 'pubsub-js';
import React from 'react';

import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/tern/tern.css';

let server;

export default class JSCodeshiftEditor extends React.Component {
  constructor(props) {
    super(props);
    loadTern();
  }

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
        mode: 'javascript',
        lineNumbers: true,
      }
    );
    this.codeMirror.setOption('extraKeys', {
      'Ctrl-Space': cm => server && server.complete(cm),
      'Ctrl-I': cm => server && server.showType(cm),
      'Ctrl-O': cm => server && server.showDocs(cm),
    })

    if (this.props.onContentChange) {
      this._onContentChange();
    }

    this._bindCMHandler('changes', () => {
      clearTimeout(this._updateTimer);
      this._updateTimer = setTimeout(this._onContentChange.bind(this), 200);
    });
    this._bindCMHandler('cursorActivity', cm => {
      clearTimeout(this._updateTimer);
      this._updateTimer = setTimeout(this._onActivity.bind(this), 100);
      server && server.updateArgHints(cm);
    });

    this._subscriptions.push(
      PubSub.subscribe('PANEL_RESIZE', () => {
        if (this.codeMirror) {
          this.codeMirror.refresh();
        }
      })
    );

    if (this.props.error) {
      this._setError(this.props.error);
    }
  }

  componentWillUnmount() {
    this._unbindHandlers();
    this._markerRange = null;
    this._mark = null;
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
    this._subscriptions.forEach(token => {
      PubSub.unsubscribe(token);
    });
  }

  _onContentChange() {
    let doc = this.codeMirror.getDoc();
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

function loadTern() {
  require(
    [
      'codemirror/addon/hint/show-hint',
      'codemirror/addon/tern/tern',
      'acorn',
    ],
    (_1, _2, acorn) => {
      global.acorn = acorn;
      require(
        [
          'tern',
          'tern/plugin/doc_comment',
          'tern/lib/infer',
          './defs/jscodeshift.json',
          'tern/defs/ecma5.json',
          'tern/defs/ecma6.json',
        ],
        (tern, _, infer, jscs_def, ecma5_def, ecma6_def) => {
          global.tern = tern;
          tern.registerPlugin('transformer', server => {
            server.on('afterLoad', file => {
              const fnVal = file.scope.props.transformer;
              if (fnVal) {
                const fnType = fnVal.getFunctionType();
                const cx = infer.cx();
                fnType.propagate(new infer.IsCallee(
                  infer.cx().topScope,
                  [
                    cx.definitions.jscodeshift.file,
                    cx.definitions.jscodeshift.apiObject,
                  ],
                  null,
                  infer.ANull
                ));
              }
            });
          });

          server = new CodeMirror.TernServer({
            defs: [jscs_def, ecma6_def, ecma5_def],
            plugins: {
              transformer: {strong: true},
            },
          });
        }
      );
    }
  );
}

JSCodeshiftEditor.propTypes = {
  defaultValue: React.PropTypes.string,
  onContentChange: React.PropTypes.func,
  onActivity: React.PropTypes.func,
  error: React.PropTypes.object,
  mode: React.PropTypes.string,
  posFromIndex: React.PropTypes.func,
};

JSCodeshiftEditor.defaultProps = {
  onContentChange: () => {},
  onActivity: () => {},
};
