export function logEvent(category, action, label) {
  global.ga('send', 'event', category, action, label);
}

export function logError(message, fatal) {
  global.ga('send', 'exception', {exDescription: message, exFatal: fatal});
}
