/**@jsx React.DOM */
/*jshint browser:true, newcap:false, expr:true*/
/*global CodeMirror */
"use strict";

var Editor = React.createClass({
  getDefaultProps: function() {
    return {
      value: "function foo() {\n  alert('Hello World!');\n}\n"
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
      this.codeMirror.on('change', this.onContentChange);
      this.onContentChange();
    }
    this.codeMirror.on('keyup', function(cm, event) {
      event.stopPropagation();
    });
  },

  onContentChange: function() {
    clearTimeout(this.timer);
    this.timer = setTimeout(function() {
      this.props.onContentChange(this.codeMirror.getValue());
    }.bind(this), 200);
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
