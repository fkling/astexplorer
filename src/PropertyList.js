import Element from './Element';
import React from 'react';
import ignoreProperties from './ignoreProperties';

export default class PropertyList {
  static defaultProps = {
    object: {},
    deepOpen: false,
  };

  render() {
    var focusPath = this.props.focusPath;
    var level = this.props.level;

    var properties = Object.keys(this.props.object)
      .filter(key => key !== 'parent')
      .map(key => {
        var v = this.props.object[key];
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
