import {parse} from 'babylon';

export default {
  parse(code, options) {
    return parse(code, Object.assign(
      {
        sourceType: 'module',
        features: {
          'es7.decorators': true,
          'es7.comprehensions': true,
          'es7.classProperties': true,
          'es7.asyncFunctions': true,
          'es7.exportExtensions': true,
          'es7.objectRestSpread': true,
          'es7.trailingFunctionCommas': true,
        },
        plugins: { jsx: true, flow: true },
      },
      options
    ));
  },
};
