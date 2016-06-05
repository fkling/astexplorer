import Editor from './Editor';
import PubSub from 'pubsub-js';
import React from 'react';
import SplitPane from './SplitPane';
import TransformOutput from './TransformOutput';

function resize() {
  PubSub.publish('PANEL_RESIZE');
}

export default function Transformer(props) {
  return (
    <SplitPane
      className="splitpane"
      onResize={resize}>
      <Editor
        highlight={false}
        defaultValue={props.defaultTransformCode}
        onContentChange={props.onContentChange}
      />
      <TransformOutput
        transformer={props.transformer}
        transformCode={props.transformCode}
        code={props.code}
        mode={props.mode}
      />
    </SplitPane>
  );
}

Transformer.propTypes = {
  defaultTransformCode: React.PropTypes.string,
  transformCode: React.PropTypes.string,
  transformer: React.PropTypes.object,
  code: React.PropTypes.string,
  mode: React.PropTypes.string,
  onContentChange: React.PropTypes.func,
};
