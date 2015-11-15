import Element from '../ast/Element';
import React from 'react';
import PubSub from 'pubsub-js';

export default class Tree {
  render() {
    return (
      <ul
        id="tree"
        className="container"
        onMouseLeave={function() {PubSub.publish('CLEAR_HIGHLIGHT');}}>
        <Element
          focusPath={this.props.focusPath}
          value={this.props.ast}
          level={0}
          parser={this.props.parser}
        />
      </ul>
    );
  }
}
