const storage = global.localStorage;
const key = 'explorerSettingsV1';
const noop = () => {};

export const writeState = storage ?
  state => {
    try {
      storage.setItem(key, JSON.stringify(state));
    } catch(e) {
      // eslint-disable-next-line no-console
      console.warn('Unable to write to local storage.');
    }
  } :
  noop;

export const readState = storage ?
  () => {
    try {
      const state = storage.getItem(key);
      if (state) {
        return JSON.parse(state);
      }
    } catch(e) {
      // eslint-disable-next-line no-console
      console.warn('Unable to read from local storage.');
    }
  } :
  noop;
