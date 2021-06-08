/* eslint-env worker */

// A Web Worker that wraps methods from the hermes-parser package behind a
// minimal request/response protocol.

import hermesParser from 'hermes-parser';

const handlers = {
  parse(code, options) {
    return hermesParser.parse(code, options);
  },
};

onmessage = async function(e) {
  const {type, requestId, args = []} = e.data;
  let handler = () => {
    throw new Error('No handler in Hermes worker for message type: ' + type);
  };
  if (Object.hasOwnProperty.call(handlers, type)) {
    handler = handlers[type];
  }
  let value;
  try {
    value = handler(...args);
  } catch (e) {
    postMessage({
      type,
      requestId,
      action: 'reject',
      // Errors don't survive the structured clone algorithm very well across
      // browsers - they're either not allowed or lose some of their properties.
      // Send a plain-object copy to be reconstituted by the client.
      value: {name: e.name, stack: e.stack, message: e.message, ...e},
    });
    return;
  }
  postMessage({type, requestId, action: 'resolve', value});
};
