import ASTOutput from './ASTOutput';
import Editor from './Editor';
import ErrorMessage from './ErrorMessage';
import JSCodeshiftEditor from './JSCodeshiftEditor';
import PasteDropTarget from './PasteDropTarget';
import PubSub from 'pubsub-js';
import React from 'react';
import Snippet from './Snippet';
import SplitPane from './SplitPane';
import Toolbar from './Toolbar';
import TransformOutput from './TransformOutput';
import SettingsDialog from './SettingsDialog';
import * as LocalStorage from './LocalStorage';

import getFocusPath, {nodeToRange} from './getFocusPath';
import keypress from 'keypress';
import {getCategoryByID, getDefaultParser, getParserByID, getTransformerByID} from './parsers';

function updateHashWithIDAndRevision(id, rev) {
  global.location.hash = '/' + id + (rev && rev !== 0 ? '/' + rev : '');
}

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._onCategoryChange = this._onCategoryChange.bind(this);
    this._onDropError = this._onDropError.bind(this);
    this._onDropText = this._onDropText.bind(this);
    this._onFork = this._onFork.bind(this);
    this._onParserChange = this._onParserChange.bind(this);
    this._onResize = this._onResize.bind(this);
    this._onSave = this._onSave.bind(this);
    this._onSettingsChange = this._onSettingsChange.bind(this);
    this.onActivity = this.onActivity.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onTransformChange = this.onTransformChange.bind(this);
    this.onTransformCodeChange = this.onTransformCodeChange.bind(this);
    const {snippet, revision} = props;
    if ((snippet && !revision) || (!snippet && revision)) {
      throw Error('Must set both, snippet and revision');
    }

    let parser;
    let transformer;
    let initialCode;
    let initialTransformCode;

    if (revision) {
      ({
        parser,
        transformer,
        code: initialCode,
        transformCode: initialTransformCode,
      } = this._getDataFromRevision(revision))
    } else {
      parser = getParserByID(LocalStorage.getParser()) ||
        getDefaultParser(getCategoryByID(LocalStorage.getCategory()));
      initialCode = this._getDefaultCode(parser);
    }

    this.state = {
      forking: false,
      saving: false,
      ast: null,
      transformer,
      focusPath: [],
      ...this._setCode(initialCode),
      ...this._setTransformCode(initialTransformCode),
      snippet,
      showTransformPanel: !!transformer,
      revision,
      parser,
    };
  }

  componentDidMount() {
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

    let listener = new keypress.Listener();
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
        let range = nodeToRange(this.state.parser, astNode);
        if (range) {
          PubSub.publish('CM.HIGHLIGHT', range);
        }
      }
    );
    PubSub.subscribe(
      'CLEAR_HIGHLIGHT',
      (_, astNode) => PubSub.publish(
        'CM.CLEAR_HIGHLIGHT',
        astNode && nodeToRange(this.state.parser, astNode)
      )
   );
  }

  _getDefaultCode(parser = this.state.parser) {
    return parser.category.codeExample;
  }

  _getDataFromRevision(revision) {
    const transformerID = revision.get('toolID');
    let transformer = transformerID && getTransformerByID(transformerID);
    let transformCode = revision.get('transform');
    if (transformCode && !transformer) {
      // jscodeshift was the first transformer tool. Instead of updating
      // existing rows in the DB, we do this
      transformer = getTransformerByID('jscodeshift');
    } else if (transformer && !transformCode) {
      transformCode = transformer.defaultTransform;
    }

    // Get parser from transformer > revision > local storage > default
    let parser;
    if (transformer) {
      parser = getParserByID(transformer.defaultParserID);
    }
    if (!parser) {
      parser = getParserByID(revision.get('parserID'));
    }
    if (!parser) {
      parser = getParserByID(LocalStorage.getParser());
    }
    if (!parser) {
      parser = getDefaultParser();
    }

    const code = revision.get('code') || this._getDefaultCode(parser);

    return {parser, transformer, code, transformCode};
  }

  _setCode(code) {
    return {initialCode: code, currentCode: code};
  }

  _setTransformCode(transformCode) {
    return {
      initialTransformCode: transformCode,
      currentTransformCode: transformCode,
    };
  }

  _setRevision(snippet, revision) {
    if (!snippet || !revision) {
      this.setError('Something went wrong fetching the revision. Try to refresh!');
    }

    const {
      parser,
      transformer,
      code,
      transformCode,
    } = this._getDataFromRevision(revision);

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
  }

  _clearRevision() {
    const defaultCode = this._getDefaultCode();
    const update = newState => {
      this.setState({
        ...newState,
        focusPath: [],
        ...this._setCode(defaultCode),
        ...this._setTransformCode(this.state.transformer ?
          this.state.transformer.defaultTransform :
          ''
        ),
        snippet: null,
        revision: null,
      });
    }

    this.parse(defaultCode).then(
      ast => update({ast, editorError: null}),
      error => update({ast: null, editorError: error})
    );
  }

  parse(code, parser) {
    if (!parser) {
      parser = this.state.parser;
    }
    if (!parser._promise) {
      parser._promise = new Promise(parser.loadParser);
    }
    return parser._promise.then(realParser => parser.parse(realParser, code));
  }

  onContentChange({value: code, cursor}) {
    if (this.state.ast && this.state.currentCode === code) {
      return;
    }

    this.parse(code).then(
      ast => this.setState({
        ast,
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
  }

  onTransformCodeChange({value: transformCode}) {
    this.setState({
      currentTransformCode: transformCode,
    });
  }

  onTransformChange(transformer) {
    const showTransformPanel = !this.state.showTransformPanel ||
      transformer !== this.state.transformer;
    const parser =
      showTransformPanel ? getParserByID(transformer.defaultParserID) : this.state.parser;

    let transformCode = this.state.currentTransformCode;
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
  }

  onActivity(cursorPos) {
    if (this.state.ast) {
      this.setState({
        focusPath: getFocusPath(this.state.ast, cursorPos, this.state.parser),
      });
    }
  }

  _showError(msg) {
    this.setState({error: msg});
    setTimeout(() => {
      if (msg === this.state.error) {
        this.setState({error: false});
      }
    }, 3000);
  }

  _save(fork) {
    let snippet = !fork && this.state.snippet || new Snippet();
    let code = this.refs.editor.getValue();
    let {transformer} = this.state;
    let transformerID = transformer && transformer.id;
    let transformCode = this.refs.transformEditor &&
      this.refs.transformEditor.getValue();

    let data = {
      parserID: this.state.parser.id,
    };
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
  }

  _onSave() {
    const {revision} = this.state;
    let isNewRevision = !revision &&
      (this.state.currentCode !== this._getDefaultCode() ||
       this.state.showTransformPanel &&
       this.state.currentTransformCode !==
       this.state.transformer.defaultTransform);
    let isModified = revision &&
       (this.state.initalCode !== this.state.currentCode ||
        this.state.showTransformPanel &&
        this.state.initialTransformCode !== this.state.currentTransformCode);

    if (isNewRevision || isModified) {
      this._save();
    }
  }

  _onFork() {
    if (this.state.revision) {
      this._save(true);
    }
  }

  _onResize() {
    PubSub.publish('PANEL_RESIZE');
  }

  _onDropText(type, event, text, categoryId) {
    let {parser} = this.state;
    if (categoryId && categoryId !== parser.category.id) {
      parser = getDefaultParser(getCategoryByID(categoryId));
    }
    this.parse(text, parser).then(
      ast => this.setState({
        ...this._setCode(text),
        ast,
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
  }

  _onDropError(type, event, msg) {
    this._showError(msg);
  }

  _onCategoryChange(category) {
    if (category === this.state.parser.category) {
      return;
    }

    LocalStorage.setCategory(category.id);
    let parser = getParserByID(LocalStorage.getParser(category.id)) ||
      getDefaultParser(category);

    // Verify that local storage wasn't corrupted
    if (parser.category !== category) {
      parser = getDefaultParser(category);
    }

    this.setState(
      {
        showTransformPanel: false,
        parser,
      },
      () => { this._clearRevision() }
    );
  }

  _onParserChange(parser) {
    LocalStorage.setParser(parser);
    this.parse(this.state.currentCode, parser).then(
      ast => this.setState({
        ast,
        parser,
        focusPath: [],
        editorError: null,
      }),
      error => this.setState({
        ast: null,
        editorError: error,
        parser,
      })
    );
  }

  _onSettingsChange() {
    this._onParserChange(this.state.parser);
  }

  _canSave() {
    const {
      revision,
      showTransformPanel,
      currentTransformCode,
      initialTransformCode,
    } = this.state;

    const revisionCode = revision && revision.get('code') ||
      this._getDefaultCode();

    return revisionCode !== this.state.currentCode ||
       showTransformPanel &&
       currentTransformCode !== initialTransformCode &&
       currentTransformCode !== this.state.transformer.defaultTransform;
  }

  render() {
    const {showTransformPanel} = this.state;

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
          canSave={this._canSave()}
          canFork={!!this.state.revision}
          category={this.state.parser.category}
          parser={this.state.parser}
          transformer={this.state.transformer}
          transformPanelIsEnabled={showTransformPanel}
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
          {showTransformPanel ? <SplitPane
            className="splitpane"
            onResize={this._onResize}>
            {this.state.transformer.id === 'jscodeshift' ?
              <JSCodeshiftEditor
                ref="transformEditor"
                defaultValue={this.state.initialTransformCode}
                onContentChange={this.onTransformCodeChange}
              /> :
              <Editor
                ref="transformEditor"
                highlight={false}
                defaultValue={this.state.initialTransformCode}
                onContentChange={this.onTransformCodeChange}
              />
            }
            <TransformOutput
              transformer={this.state.transformer}
              transformCode={this.state.currentTransformCode}
              code={this.state.currentCode}
              mode={this.state.parser.category.id}
            />
          </SplitPane> : null}
        </SplitPane>
        <SettingsDialog
          parser={this.state.parser}
          onChange={this._onSettingsChange}
        />
      </PasteDropTarget>
    );
  }
}

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
