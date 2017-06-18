import Editor from './Editor';
import JSCodeshiftEditor from './JSCodeshiftEditor';
import PropTypes from 'prop-types';
import PubSub from 'pubsub-js';
import React from 'react';
import SplitPane from './SplitPane';
import TransformOutput from './TransformOutput';
import PrettierButton from './buttons/PrettierButton';

function resize() {
  PubSub.publish('PANEL_RESIZE');
}

export default function Transformer(props) {
  const plainEditor = React.createElement(
    props.transformer.id === 'jscodeshift' ? JSCodeshiftEditor : Editor,
    {
      highlight: false,
      value: props.transformCode,
      onContentChange: props.onContentChange,
      enableFormatting: props.enableFormatting,
    }
  );

  const formattingEditor = (<div>
    <PrettierButton toggleFormatting={props.toggleFormatting} enableFormatting={props.enableFormatting}/>
    {plainEditor}
  </div>)

  return (
    <SplitPane
      className="splitpane"
      onResize={resize}>
      {formattingEditor}
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
  defaultTransformCode: PropTypes.string,
  transformCode: PropTypes.string,
  transformer: PropTypes.object,
  code: PropTypes.string,
  mode: PropTypes.string,
  onContentChange: PropTypes.func,
  toggleFormatting: PropTypes.func,
  enableFormatting: PropTypes.bool,
};
