import Element from './tree/Element';
import PropTypes from 'prop-types';
import React from 'react';
import PubSub from 'pubsub-js';
import {logEvent} from '../../utils/logger';

import './css/tree.css'

export default class Tree extends React.Component {
  constructor(props) {
    super(props);

    this.state = {autofocus: true, hideFunctions: true};
  }

  _setOption(name, event) {
    this.setState({[name]: event.target.checked});
    logEvent(
      'tree_view_settings',
      event.target.checked ? 'enabled' : 'disabled',
      name
    );
  }

  render() {
    return (
      <div className="tree-visualization container">
        <div className="toolbar">
          <label title="Auto open the node at the cursor in the source code">
            <input
              type="checkbox"
              checked={this.state.autofocus}
              onChange={this._setOption.bind(this, 'autofocus')}
            />
            Autofocus
          </label>
          &#8203;
          <label>
            <input
              type="checkbox"
              checked={this.state.hideFunctions}
              onChange={this._setOption.bind(this, 'hideFunctions')}
            />
            Hide methods
          </label>
          &#8203;
          <label>
            <input
              type="checkbox"
              checked={this.state.hideEmptyKeys}
              onChange={this._setOption.bind(this, 'hideEmptyKeys')}
            />
            Hide empty keys
          </label>
          &#8203;
          <label>
            <input
              type="checkbox"
              checked={this.state.hideLocationData}
              onChange={this._setOption.bind(this, 'hideLocationData')}
            />
            Hide location data
          </label>
          &#8203;
          <label>
            <input
              type="checkbox"
              checked={this.state.hideTypeKeys}
              onChange={this._setOption.bind(this, 'hideTypeKeys')}
            />
            Hide type keys
          </label>
        </div>
        <ul onMouseLeave={() => {PubSub.publish('CLEAR_HIGHLIGHT');}}>
          <Element
            focusPath={this.props.focusPath}
            value={this.props.ast}
            level={0}
            parser={this.props.parser}
            settings={this.state}
          />
        </ul>
      </div>
    );
  }
}

Tree.propTypes = {
  focusPath: PropTypes.array,
  ast: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  parser: PropTypes.object,
};
