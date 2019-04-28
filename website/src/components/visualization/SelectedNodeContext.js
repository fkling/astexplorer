import React from 'react';

const SelectedNodeContext = React.createContext();

function useSelectedNode() {
  const context = React.useContext(SelectedNodeContext);
  if (!context) {
    throw new Error('useSelectedNode must be used within a SelectedNodeContext');
  }
  return context;
}

let unselectCallback;

function setSelectedNode(node, cb) {
  if (unselectCallback) {
    unselectCallback();
  }
  if (node) {
    global.$node = node;
    unselectCallback = cb;
  } else {
    unselectCallback = null;
    delete global.$node;
  }
}

function SelectedNodeProvider(props) {
  return <SelectedNodeContext.Provider value={setSelectedNode} {...props} />;
}

export {SelectedNodeProvider, useSelectedNode};
