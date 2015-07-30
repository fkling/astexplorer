import React from 'react';

export default class ArrayElements {
  static defaultProps = {
    deepOpen: false,
    array: [],
  };

  render() {
    var Element = require('./Element');
    var focusPath = this.props.focusPath;
    var level = this.props.level;

    var elements = this.props.array.map(
      (v, i) =>
        <Element
          key={i}
          focusPath={focusPath}
          deepOpen={this.props.deepOpen}
          value={v}
          level={level}
        />
    );
    return <ul className="value-body">{elements}</ul>;
  }
}
