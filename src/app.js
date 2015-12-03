import ASTOutput from './ASTOutput';
import Editor from './Editor';
import ErrorMessage from './ErrorMessage';
import PasteDropTarget from './PasteDropTarget';
import PubSub from 'pubsub-js';
import React from 'react';
import Snippet from './Snippet';
import SplitPane from './SplitPane';
import Toolbar from './Toolbar';
import TransformOutput from './TransformOutput';
import SettingsDialog from './SettingsDialog';
import * as LocalStorage from './LocalStorage';

import getFocusPath from './getFocusPath';
import keypress from 'keypress';
import {getTransformerByID} from './transformers';
import {getCategoryByID, getDefaultParser, getParser} from './parsers';

function updateHashWithIDAndRevision(id, rev) {
  global.location.hash = '/' + id + (rev && rev !== 0 ? '/' + rev : '');
}

var App = React.createClass({
  getInitialState: function() {
    var snippet = this.props.snippet;
    var revision = this.props.revision;
    if ((snippet && !revision) || (!snippet && revision)) {
      throw Error('Must set both, snippet and revision');
    }
    const transformerID = revision && revision.get('toolID');
    let transformer = transformerID && getTransformerByID(transformerID);
    const initialTransformCode = revision && revision.get('transform');
    if (initialTransformCode && !transformer) {
      // jscodeshift was the first transformer tool. Instead of updating
      // existing rows in the DB, we do this
      transformer = getTransformerByID('jscodeshift');
    }

    const parser = getParser(
      transformer ? transformer.defaultParser : LocalStorage.getParser()
    ) || getDefaultParser();

    const initialCode = revision && revision.get('code') || this._getDefaultCode(parser);

    return {
      forking: false,
      saving: false,
      ast: null,
      transformer,
      focusPath: [],
      ...this._setCode(initialCode),
      ...this._setTransformCode(initialTransformCode),
      snippet: snippet,
      showTransformPanel: !!transformer,
      revision: revision,
      parser,
    };
  },

  componentDidMount: function() {
    if (this.props.error) {
      this._showError(this.props.error);
    }
    global.onhashchange = () => {
      if (!this.state.saving || !this.state.forking) {
        Snippet.fetchFromURL().then(
          data => {
            if (data) {
              this._setRevision(data.snippet, data.revision);
            } else {
              this._clearRevision();
            }
          },
          error => this._showError('Failed to fetch revision: ' + error.message)
        );
      }
    };

    global.onbeforeunload = () => {
      if (this.state.initialTransformCode !== this.state.currentTransformCode) {
        return 'You have unsaved transform code. Do you really want to leave?';
      }
    };

    var listener = new keypress.Listener();
    listener.simple_combo('meta s', (event) => {
      event.preventDefault();
      this._onSave();
    });
    listener.simple_combo('cmd shift s', (event) => {
      event.preventDefault();
      this._onFork();
    });
    listener.simple_combo('ctrl alt s', (event) => {
      event.preventDefault();
      this._onFork();
    });

    PubSub.subscribe(
      'HIGHLIGHT',
      (_, astNode) => {
        let range = this.state.parser.nodeToRange(astNode);
        if (range) {
          PubSub.publish('CM.HIGHLIGHT', range);
        }
      }
    );
    PubSub.subscribe(
      'CLEAR_HIGHLIGHT',
      (_, astNode) => PubSub.publish(
        'CM.CLEAR_HIGHLIGHT',
        astNode && this.state.parser.nodeToRange(astNode)
      )
   );
  },

  _getDefaultCode(parser = this.state.parser) {
    return parser.category.codeExample;
  },

  _setCode(code) {
    return {initialCode: code, currentCode: code};
  },

  _setTransformCode(transformCode) {
    return {
      initialTransformCode: transformCode,
      currentTransformCode: transformCode,
    };
  },

  _setRevision: function(snippet, revision) {
    if (!snippet || !revision) {
      this.setError('Something went wrong fetching the revision. Try to refresh!');
    }

    const code = revision.get('code') || this._getDefaultCode();
    const transformerID = revision.get('toolID');
    let transformer = transformerID && getTransformerByID(transformerID);
    let transformCode = revision.get('transform');

    if (transformCode && !transformer) {
      transformer = getTransformerByID('jscodeshift');
    } else if (transformer && !transformCode) {
      transformCode = transformer.defaultTransform;
    }
    const parser = getParser(
      transformer ? transformer.defaultParser : LocalStorage.getParser()
    ) || this.state.parser;

    const update = data => { // eslint-disable-line no-shadow
      this.setState({
        ...data,
        snippet,
        revision,
        transformer,
        ...this._setCode(code),
        ...this._setTransformCode(transformCode),
        focusPath: [],
        parser,
      });
    };

    if (!this.state.snippet ||
        snippet.id !== this.state.snippet.id ||
        revision.id !== this.state.revision.id) {
      if (this.state.revision && (
            code !== this.state.revision.get('code') ||
            transformCode !== this.state.revision.get('transform')
          ) ||
          parser !== this.state.parser) {
        this.parse(code).then(
          ast => update({ast, editorError: null}),
          error => update({ast: null, editorError: error})
        );
      } else {
        update({ast: this.state.ast, editorError: null});
      }
    }
  },

  _clearRevision: function() {
    const defaultCode = this._getDefaultCode();
    this.parse(defaultCode).then(ast => this.setState({
      ast: ast,
      editorError: null,
      focusPath: [],
      ...this._setCode(defaultCode),
      ...this._setTransformCode(this.state.transformer ?
        this.state.transformer.defaultTransform :
        ''
      ),
      snippet: null,
      revision: null,
    }));
  },

  parse: function(code, parser) {
    if (!parser) {
      parser = this.state.parser;
    }
    if (!parser._promise) {
      parser._promise = new Promise(parser.loadParser);
    }
    return parser._promise.then(realParser => parser.parse(realParser, code));
  },

  onContentChange: function({value: code, cursor}) {
    if (this.state.ast && this.state.currentCode === code) {
      return;
    }

    this.parse(code).then(
      ast => this.setState({
        ast: ast,
        currentCode: code,
        focusPath: cursor ? getFocusPath(ast, cursor, this.state.parser) : [],
        editorError: null,
      }),
      error => this.setState({
        ast: null,
        currentCode: code,
        editorError: error,
      })
    );
  },

  onTransformCodeChange: function({value: transformCode}) {
    this.setState({
      currentTransformCode: transformCode,
    });
  },

  onTransformChange: function(transformer) {
    const showTransformPanel = !this.state.showTransformPanel ||
      transformer !== this.state.transformer;
    const parser =
      showTransformPanel &&
      this.state.parser !== getParser(transformer.defaultParser) ?
      getParser(transformer.defaultParser) :
      this.state.parser;

    var transformCode = this.state.currentTransformCode;
    if (transformer !== this.state.transformer) {
      transformCode = transformer.defaultTransform;
    }

    if (parser !== this.state.parser) {
      this.parse(this.state.currentCode, parser).then(
        ast => this.setState({
          ast,
          parser,
          transformer,
          ...this._setTransformCode(transformCode),
          focusPath: [],
          editorError: null,
          showTransformPanel,
        }),
        error => this.setState({
          ast: null,
          editError: error,
          parser,
          transformer,
          ...this._setTransformCode(transformCode),
          showTransformPanel,
        })
      );
    } else {
      this.setState({
        showTransformPanel,
        parser,
        transformer,
        ...this._setTransformCode(transformCode),
      });
    }
    this._onResize();
  },

  onActivity: function(cursorPos) {
    if (this.state.ast) {
      this.setState({
        focusPath: getFocusPath(this.state.ast, cursorPos, this.state.parser),
      });
    }
  },

  _showError: function(msg) {
    this.setState({error: msg});
    setTimeout(() => {
      if (msg === this.state.error) {
        this.setState({error: false});
      }
    }, 3000);
  },

  _save: function(fork) {
    var snippet = !fork && this.state.snippet || new Snippet();
    var code = this.refs.editor.getValue();
    var transformer = this.state.transformer;
    var transformerID = transformer && transformer.id;
    var transformCode = this.refs.transformEditor &&
      this.refs.transformEditor.getValue();

    var data = {};
    if (code !== this._getDefaultCode()) {
      data.code = code;
    }
    if (this.state.showTransformPanel && transformCode &&
        transformCode !== transformer.defaultTransform) {
      data.transform = transformCode;
      data.toolID = transformerID;
    }

    this.setState({saving: !fork, forking: fork});
    snippet.createNewRevision(data).then(
      response => {
        if (response) {
          updateHashWithIDAndRevision(snippet.id, response.revisionNumber);
        }
        this.setState({
          saving: false,
          forking: false,
        });
      },
      (_, error) => {
        this._showError('Could not save: ' + error.message);
        this.setState({saving: false, forking: false});
      }
    );
  },

  _onSave: function() {
    const {revision} = this.state;
    var isNewRevision = !revision &&
      (this.state.currentCode !== this._getDefaultCode() ||
       this.state.showTransformPanel &&
       this.state.currentTransformCode !==
       this.state.transformer.defaultTransform);
    var isModified = revision &&
       (this.state.initalCode !== this.state.currentCode ||
        this.state.showTransformPanel &&
        this.state.initialTransformCode !== this.state.currentTransformCode);

    if (isNewRevision || isModified) {
      this._save();
    }
  },

  _onFork: function() {
    if (this.state.revision) {
      this._save(true);
    }
  },

  _onResize: function() {
    PubSub.publish('PANEL_RESIZE');
  },

  _onDropText: function(type, event, text, categoryId) {
    let parser = this.state.parser;
    if (categoryId && categoryId !== parser.category.id) {
      parser = getCategoryByID(categoryId).getDefaultParser();
    }
    this.parse(text, parser).then(
      ast => this.setState({
        ...this._setCode(text),
        ast: ast,
        parser,
        focusPath: [],
        editorError: null,
      }),
      error => this.setState({
        ...this._setCode(text),
        ast: null,
        editorError: error,
        parser,
      })
    );
  },

  _onDropError: function(type, event, msg) {
    this._showError(msg);
  },

  _onCategoryChange: function(category) {
    let parser = category.getDefaultParser();
    LocalStorage.setParser(parser.id);
    this.setState({ parser }, () => {
      this._clearRevision();
    });
  },

  _onParserChange: function(parser) {
    LocalStorage.setParser(parser.id);
    this.parse(this.state.currentCode, parser).then(
      ast => this.setState({
        ast: ast,
        parser: parser,
        focusPath: [],
        editorError: null,
      }),
      error => this.setState({
        ast: null,
        editorError: error,
        parser: parser,
      })
    );
  },

  _onSettingsChange: function() {
    this._onParserChange(this.state.parser);
  },

  render: function() {
    const {
      revision,
      showTransformPanel,
      currentTransformCode,
      initialTransformCode,
    } = this.state;
    const revisionCode = revision && revision.get('code') || this._getDefaultCode();
    const canSave = revisionCode !== this.state.currentCode ||
       showTransformPanel &&
       currentTransformCode !== initialTransformCode &&
       currentTransformCode !== this.state.transformer.defaultTransform;

    return (
      <PasteDropTarget
        className="dropTarget"
        dropindicator={
          <div className="dropIndicator">
            <div>Drop the code or (JSON-encoded) AST file here</div>
          </div>
        }
        onText={this._onDropText}
        onError={this._onDropError}>
        <Toolbar
          forking={this.state.forking}
          saving={this.state.saving}
          onSave={this._onSave}
          onFork={this._onFork}
          onCategoryChange={this._onCategoryChange}
          onParserChange={this._onParserChange}
          onTransformChange={this.onTransformChange}
          canSave={canSave}
          canFork={!!revision}
          category={this.state.parser.category}
          parser={this.state.parser}
          transformer={this.state.transformer}
          transformPanelIsEnabled={this.state.showTransformPanel}
        />
        {this.state.error ? <ErrorMessage message={this.state.error} /> : null}
        <SplitPane
          className="splitpane-content"
          vertical={true}
          onResize={this._onResize}>
          <SplitPane
            className="splitpane"
            onResize={this._onResize}>
            <Editor
              ref="editor"
              mode={this.state.parser.category.id}
              defaultValue={this.state.initialCode}
              error={this.state.editorError}
              onContentChange={this.onContentChange}
              onActivity={this.onActivity}
            />
            <ASTOutput
              ast={this.state.ast}
              editorError={this.state.editorError}
              focusPath={this.state.focusPath}
              parser={this.state.parser}
            />
          </SplitPane>
          {this.state.showTransformPanel ? <SplitPane
            className="splitpane"
            onResize={this._onResize}>
            <Editor
              ref="transformEditor"
              highlight={false}
              defaultValue={this.state.initialTransformCode}
              onContentChange={this.onTransformCodeChange}
            />
            <TransformOutput
              transformer={this.state.transformer}
              transformCode={this.state.currentTransformCode}
              code={this.state.currentCode}
            />
          </SplitPane> : null}
        </SplitPane>
        <SettingsDialog
          parser={this.state.parser}
          onChange={this._onSettingsChange}
        />
      </PasteDropTarget>
    );
  },
});

function render(props) {
  React.render(
    <App {...props} />,
    document.getElementById('container')
  );
}

Snippet.fetchFromURL().then(
  data => render(data),
  error => render({error: 'Failed to fetch revision: ' + error.message})
);
