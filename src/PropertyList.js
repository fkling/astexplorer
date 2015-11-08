import Element from './Element';
import React from 'react';

export default class PropertyList {
  static defaultProps = {
    object: {},
    deepOpen: false,
  };

  render() {
    var focusPath = this.props.focusPath;
    var level = this.props.level;
    var object = this.props.object;
    var properties = Object.keys(object).map(key => {
      var v = object[key];
      return ( // eslint-disable-line consistent-return
        <Element
          key={key}
          name={key}
          focusPath={focusPath}
          deepOpen={this.props.deepOpen}
          value={v}
          level={level}
        />
      );
    });
    return <ul className="value-body">{properties}</ul>;
  }
}
