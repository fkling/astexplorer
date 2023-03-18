import {getTransformer, getTransformCode, getCode, showTransformer} from './selectors';
import {SourceMapConsumer} from 'source-map/lib/source-map-consumer';

async function transform(transformer, transformCode, code) {
  // Transforms may make use of Node's __filename global. See GitHub issue #420.
  // So we define a dummy one.
  if (!global.__filename) {
    global.__filename = 'transform.js';
  }
  if (!transformer._promise) {
    transformer._promise = new Promise(transformer.loadTransformer);
  }
  let realTransformer;
  try {
    realTransformer = await transformer._promise;
    let result = await transformer.transform(realTransformer, transformCode, code);
    let map = null;
    if (typeof result !== 'string') {
      if (result.map) {
        map = new SourceMapConsumer(result.map);
      }
      result = result.code;
    }
    return { result, map, version: realTransformer.version, error: null };
  } catch(error) {
    return {
      error,
      version: realTransformer ? realTransformer.version : '',
    };
  }
}

export default store => next => async (action) => {
  const oldState = store.getState();
  next(action);
  const newState = store.getState();

  const show = showTransformer(newState);

  if (!show) {
    return
  }

  const newTransformer = getTransformer(newState);
  const newTransformCode = getTransformCode(newState);
  const newCode = getCode(newState);

  if (
    action.type === 'INIT' ||
    show != showTransformer(oldState) ||
    getTransformer(oldState) !== newTransformer ||
    getTransformCode(oldState) !== newTransformCode ||
    getCode(oldState) !== newCode
  ) {
    if (!newTransformer || newCode == null) {
      return;
    }

    if (console.clear) {
      console.clear();
    }

    let result;
    try  {
      result = await transform(newTransformer, newTransformCode, newCode);
    } catch (error) {
      result = {error}
    }

    // Did anything change in the meantime?
    if (
      newTransformer !== getTransformer(store.getState()) ||
      newTransformCode !== getTransformCode(store.getState()) ||
      newCode !== getCode(store.getState())
    ) {
      return;
    }

    if (result.error) {
      console.error(result.error); // eslint-disable-line no-console
    }
    next({
      type: 'SET_TRANSFORM_RESULT',
      result,
    });
  }
};
