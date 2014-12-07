/**@jsx React.DOM */
/*jshint browser:true, newcap:false, expr:true*/
"use strict";

var CodeMirror = require('codemirror');
require('codemirror/mode/javascript/javascript');
require('codemirror/addon/fold/foldgutter');
require('codemirror/addon/fold/foldcode');
require('codemirror/addon/fold/brace-fold');
var React = require('react/addons');

var debounce = require('lodash.debounce');

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
      this._updateFolds();
    }
  },

  shouldComponentUpdate: function() {
    return false;
  },

  componentDidMount: function() {
    this._folds = [];
    this._CMHandlers = [];
    this._subscriptions = [];
    this.codeMirror = CodeMirror(
      this.refs.container.getDOMNode(),
      {
        value: this.props.value,
        mode: {name: "javascript", json: true},
        lineNumbers: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
      }
    );

    if (this.props.onContentChange) {
      this._onContentChange();
    }
    var debouncedActivityHandler = debounce(function() {
      this._onContentChange();
      this._onActivity();
    }.bind(this), 200);

    this._bindCMHandler('change', () => {
      debouncedActivityHandler();
      this._folds = [];
      this._updateFolds();
    });
    this._bindCMHandler('cursorActivity', debouncedActivityHandler);
    this._bindCMHandler('viewportChange', this._updateFolds);
    this._bindCMHandler('fold', this._updateFolds);

    this._updateFolds();
  },

  componentWillUnmount: function() {
    this._unbindHandlers();
    var container = this.refs.container.getDOMNode();
    container.removeChild(container.children[0]);
    this.codeMirror = null;
    this._folds = null;
  },

  _updateFolds: debounce(function() {
    var vp = this.codeMirror.getViewport();
    this._foldLocs(vp.from, vp.to);
  }, 90),

  _foldLocs: function(from, to) {
    var cur = from;
    this.codeMirror.operation(() => {
      this.codeMirror.eachLine(from, to, line => {
        if (line.text.indexOf('"loc":') > -1 && !this._folds[cur]) {
          this._folds[cur] = true;
          this.codeMirror.foldCode(cur);
        }
        cur += 1;
      });
    });
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

  _onContentChange: function() {
    this.props.onContentChange && this.props.onContentChange(
      this.codeMirror.getValue()
    );
  },

  _onActivity: function() {
    this.props.onActivity && this.props.onActivity(this.codeMirror.getCursor());
  },

  onReset: function() {
    this.props.onReset && this.props.onReset();
  },

  render: function() {
    return (
      <div id="JSONEditor" className={this.props.className} ref="container" />
    );
  }
});

module.exports = Editor;
