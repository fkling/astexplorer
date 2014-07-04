/**@jsx React.DOM */
/*jshint browser:true, newcap:false, expr:true*/
/*global CodeMirror */
"use strict";

var PubSub = require('pubsub-js');
var React = require('react/addons');

var fs = require('fs');
var isEqual = require('lodash.isEqual');
var debounce = require('lodash.debounce');


var initialCode = fs.readFileSync(__dirname + '/codeExample.txt', 'utf8');

var Editor = React.createClass({
  getDefaultProps: function() {
    return {
      value: initialCode
    };
  },

  componentWillReceiveProps: function(nextProps) {
    /*
    var value = this.codeMirror.getValue();
    if (nextProps.value !== value) {
      this.codeMirror.setValue(nextProps.value);
    }
    */
  },

  shouldComponentUpdate: function() {
    return false;
  },

  componentDidMount: function() {
    this.codeMirror = CodeMirror(
      this.refs.container.getDOMNode(),
      {
        value: this.props.value,
        lineNumbers: true
      }
    );

    if (this.props.onContentChange) {
      this.codeMirror.on('change', debounce(this.onContentChange, 200));
      this.onContentChange();
    }

    this.codeMirror.on('cursorActivity', debounce(function(cm) {
       this.props.onActivity && this.props.onActivity(cm.getCursor());
    }.bind(this), 250));

    // This is some really ugly hack to change the highlight in the editor from
    // anywhere - don't do this in a real React app!
    this._markerRange = null;
    this._mark = null;
    PubSub.subscribe('CM.HIGHLIGHT', function(_, loc) {
      if (isEqual(loc, this._markerRange)) return;
      this._markerRange = loc;
      if (this.mark) this.mark.clear();
      this._mark = this.codeMirror.markText(loc.from, loc.to, {className: 'marked'});
    }.bind(this));

    PubSub.subscribe('CM.CLEAR_HIGHLIGHT', function() {
      this._markerRange = null;
      if (this._mark) {
        this._mark.clear();
        this._mark = null;
      }
    }.bind(this));
  },

  onContentChange: function() {
    this.props.onContentChange(this.codeMirror.getValue());
  },

  onReset: function() {
    this.props.onReset && this.props.onReset();
  },

  render: function() {
    /* jshint ignore:start */
    return (
      <div id="Editor" ref="container" />
    );
    /* jshint ignore:end */
  }
});

module.exports = Editor;
