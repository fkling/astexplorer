import CodeMirror from 'codemirror';
import React from 'react';
import Editor from './Editor';

import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/tern/tern.css';

let server;

export default class JSCodeshiftEditor extends Editor {
  constructor(props) {
    super(props);
    loadTern();
  }

  componentDidMount() {
    super.componentDidMount();

    this.codeMirror.setOption('extraKeys', {
      'Ctrl-Space': cm => server && server.complete(cm),
      'Ctrl-I': cm => server && server.showType(cm),
      'Ctrl-O': cm => server && server.showDocs(cm),
    });

    this._bindCMHandler('cursorActivity', cm => {
      server && server.updateArgHints(cm);
    });
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
          '../defs/jscodeshift.json',
          'tern/defs/ecmascript.json',
        ],
        (tern, _, infer, jscs_def, ecmascript) => {
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
            defs: [jscs_def, ecmascript],
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
  value: React.PropTypes.string,
  highlight: React.PropTypes.bool,
  lineNumbers: React.PropTypes.bool,
  readOnly: React.PropTypes.bool,
  onContentChange: React.PropTypes.func,
  onActivity: React.PropTypes.func,
  posFromIndex: React.PropTypes.func,
  error: React.PropTypes.object,
  mode: React.PropTypes.string,
};

JSCodeshiftEditor.defaultProps = Object.assign(
  {},
  Editor.defaultProps,
  {
    highlight: false,
  }
);
