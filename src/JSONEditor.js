var CodeMirror = require('codemirror');
require('codemirror/mode/javascript/javascript');
require('codemirror/addon/fold/foldgutter');
require('codemirror/addon/fold/foldcode');
require('codemirror/addon/fold/brace-fold');
var PubSub = require('pubsub-js');
var React = require('react/addons');

var Editor = React.createClass({

  getValue: function() {
    return this.codeMirror && this.codeMirror.getValue();
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.value !== this.codeMirror.getValue()) {
      // preserve scroll position
      var info = this.codeMirror.getScrollInfo();
      this.codeMirror.setValue(nextProps.value);
      this.codeMirror.scrollTo(info.left, info.top);
    }
  },

  shouldComponentUpdate: function() {
    return false;
  },

  componentDidMount: function() {
    this._CMHandlers = [];
    this._subscriptions = [];
    this.codeMirror = CodeMirror(
      this.refs.container.getDOMNode(),
      {
        value: this.props.value,
        mode: {name: "javascript", json: true},
        readOnly: true,
        lineNumbers: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
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
  },

  componentWillUnmount: function() {
    this._unbindHandlers();
    var container = this.refs.container.getDOMNode();
    container.removeChild(container.children[0]);
    this.codeMirror = null;
  },

  _bindCMHandler: function(event, handler) {
    this._CMHandlers.push(event, handler);
    this.codeMirror.on(event, handler);
  },

  _unbindHandlers: function() {
    var cmHandlers = this._CMHandlers;
    for (var i = 0; i < cmHandlers.length; i += 2) {
      this.codeMirror.off(cmHandlers[i], cmHandlers[i+1]);
    }
  },

  render: function() {
    return (
      <div id="JSONEditor" className={this.props.className} ref="container" />
    );
  }
});

module.exports = Editor;
