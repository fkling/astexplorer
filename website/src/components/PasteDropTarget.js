import PropTypes from 'prop-types';
import React from 'react';
import { categories } from '../parsers';

function importEscodegen() {
  return new Promise(resolve => require(['escodegen'], resolve));
}

const acceptedFileTypes = new Map([
  ['application/json', 'JSON'],
  ['text/plain', 'TEXT'],
]);

categories.forEach(({ id, mimeTypes }) => {
  mimeTypes.forEach(mimeType => {
    acceptedFileTypes.set(mimeType, id);
  });
});

export default class PasteDropTarget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
    };
  }

  _onASTError(type, event, ex) {
    this.props.onError(
      type,
      event,
      `Cannot process pasted AST: ${ex.message}`
    );
    throw ex;
  }

  componentDidMount() {
    this._listeners = [];
    let target = this.container;

    // Handle pastes
    this._bindListener(document, 'paste', event => {
      if (!event.clipboardData) {
        // No browser support? :(
        return;
      }
      let cbdata = event.clipboardData;
      // Plain text
      if (!cbdata.types.indexOf || !cbdata.types.indexOf('text/plain') > -1) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
      this._jsonToCode(cbdata.getData('text/plain')).then(
        code => this.props.onText('paste', event, code),
        ex => {
          if (event.target.nodeName !== 'TEXTAREA') {
            this._onASTError('paste', event, ex);
          }
        }
      );
    }, true);

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
      let categoryId = acceptedFileTypes.get(file.type);
      if (!categoryId || !this.props.onText) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      let reader = new FileReader();
      reader.onload = readerEvent => {
        let text = readerEvent.target.result;
        if (categoryId === 'JSON' || categoryId === 'TEXT') {
          text = this._jsonToCode(text).then(
            text => {
              categoryId = 'javascript';
              return text;
            },
            ex => {
              if (categoryId === 'JSON') {
                this._onASTError('drop', readerEvent, ex);
              } else {
                categoryId = undefined;
                return text;
              }
            }
          );
        }
        Promise.resolve(text).then(text => {
          this.props.onText('drop', readerEvent, text, categoryId);
        });
      };
      reader.readAsText(file);
    }, true);

    this._bindListener(target, 'dragleave', () => {
      clearTimeout(timer);
      timer = setTimeout(() => this.setState({dragging: false}), 50);
    }, true);
  }

  componentWillUnmount() {
    for (const removeListener of this._listeners) {
      removeListener();
    }
    this._listeners = null;
  }

  _jsonToCode(json) {
    let ast;
    try {
      ast = JSON.parse(json);
    }
    catch(err) {
      return Promise.resolve(json);
    }
    return importEscodegen().then(escodegen => {
      return escodegen.generate(ast, {format: {indent: {style: '  '}}});
    });
  }

  _bindListener(elem, event, listener, capture) {
    for (const e of event.split(/\s+/)) {
      elem.addEventListener(e, listener, capture);
      this._listeners.push(
        () => elem.removeEventListener(e, listener, capture),
      );
    }
  }

  render() {
    let {children, onText: _onText, ...props} = this.props;
    const dropindicator = this.state.dragging ?
      <div className="dropIndicator">
        <div>Drop the code or (JSON-encoded) AST file here</div>
      </div> :
      null;

    return (
      <div
        ref={c => this.container = c}
        {...props}>
        {dropindicator}
        {children}
      </div>
    );
  }
}

PasteDropTarget.propTypes = {
  onText: PropTypes.func,
  onError: PropTypes.func,
  children: PropTypes.node,
};
