import React from 'react';

import escodegen from 'escodegen';

export default class PasteDropTarget extends React.Component {
  static propTypes = {
    dropindiciator: React.PropTypes.element,
    onText: React.PropTypes.func,
    onError: React.PropTypes.func,
  };

  static defaultProps = {
    onError: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
    };
  }

  componentDidMount() {
    this._listeners = [];
    let target = React.findDOMNode(this.refs.container);

    // Handle pastes
    this._bindListener(document, 'paste', event => {
      if (!event.clipboardData) {
        // No browser support? :(
        return;
      }
      let cbdata = event.clipboardData;
      // Plain text
      if (cbdata.types.indexOf && cbdata.types.indexOf('text/plain') > -1) {
        try {
          if (this.props.onText) {
            let code = this._jsonToCode(cbdata.getData('text/plain'));
            event.stopPropagation();
            event.preventDefault();
            this.props.onText('paste', event, code);
          }
        }
        catch(ex) {
          if (event.target.nodeName !== 'TEXTAREA') {
            this.props.onError(
              'paste',
              event,
              'Cannot process pasted AST: ' + ex.message
            );
            throw ex;
          }
        }
      }
    }, true);

    let acceptedFileTypes = {
      'text/javascript': true,
      'text/css': true,
      'text/html': true,
      'application/json': true,
      'text/plain': true,
    };

    let timer;

    // Handle file drops
    this._bindListener(target, 'dragenter', event => {
      clearTimeout(timer);
      event.preventDefault();
      this.setState({dragging: true});
    }, true);

    this._bindListener(target, 'dragover', event => {
      clearTimeout(timer);
      event.preventDefault();
      event.dataTransfer.dropEffect = 'copy';
    }, true);

    this._bindListener(target, 'drop', event => {
      this.setState({dragging: false});
      let file = event.dataTransfer.files[0];
      let {type} = file;
      if (!acceptedFileTypes[type] || !this.props.onText) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      let reader = new FileReader();
      reader.onload = readerEvent => {
        let text = readerEvent.target.result;
        switch (type) {
          case 'text/javascript':
            this.props.onText('drop', readerEvent, text, 'javascript');
            break;
          case 'text/css':
            this.props.onText('drop', readerEvent, text, 'css');
            break;
          case 'text/html':
            this.props.onText('drop', readerEvent, text, 'htmlmixed');
            break;
          case 'application/json':
            try {
              this.props.onText('drop', readerEvent, this._jsonToCode(text), 'javascript');
            }
            catch(ex) {
              this.props.onError(
                'drop',
                readerEvent,
                'Unable to handle dropped file: ' + ex.message
              );
              throw ex;
            }
            break;
          default:
            // JSON AST ?
            try {
              text = this._jsonToCode(text);
            }
            catch(ex) { /* swallow exception */} // eslint-disable-line no-empty
            finally {
              this.props.onText('drop', readerEvent, text);
            }
            break;
        }
      };
      reader.readAsText(file);
    }, true);

    this._bindListener(target, 'dragleave', () => {
      clearTimeout(timer);
      timer = setTimeout(() => this.setState({dragging: false}), 50);
    }, true);
  }

  componentWillUnmount() {
    for (let i = 0; i < this._listeners.length; i += 4) {
      let [elem, event, listener, capture] = this._listeners[i];
      elem.removeEventListener(event, listener, capture);
    }
    this._listeners = null;
  }

  _jsonToCode(json) {
    let ast = JSON.parse(json);
    return escodegen.generate(ast, {format: {indent: {style: '  '}}});
  }

  _bindListener(elem, event, listener, capture) {
    event.split(/\s+/).forEach(e => {
      elem.addEventListener(e, listener, capture);
      this._listeners.push(elem, listener, capture);
    });
  }

  render() {
    let {children, dropindicator, ...props} = this.props;
    if (!this.state.dragging) {
      dropindicator = null;
    }
    return (
      <div
        ref="container"
        {...props}>
        {dropindicator}
        {children}
      </div>
    );
  }
}
