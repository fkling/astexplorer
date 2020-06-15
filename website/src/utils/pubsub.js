const subscribers = {};

export function subscribe(topic, handler) {
  let handlers = subscribers[topic];
  if (!handlers) {
    handlers = subscribers[topic] = [];
  }
  if (handlers.indexOf(handler) === -1) {
    handlers.push(handler);
  }

  return () => handlers.splice(handlers.indexOf(handler), 1);
}

export function publish(topic, data) {
  if (subscribers[topic]) {
    setTimeout(function callSubscribers() {
      if (subscribers[topic]) {
        const handlers = subscribers[topic];
        for (var i = 0; i < handlers.length; i++) {
          handlers[i](data);
        }
      }
    }, 0);
  }
}

export function clear(unsubscribers) {
  unsubscribers.forEach(call);
}

function call(f) {
  return f();
}
