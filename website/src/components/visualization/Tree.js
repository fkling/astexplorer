import Element from './tree/Element';
import PropTypes from 'prop-types';
import React from 'react';
import PubSub from 'pubsub-js';
import {logEvent} from '../../utils/logger';

import './css/tree.css'

const {useReducer} = React;

const STORAGE_KEY = 'tree_settings';

function initSettings() {
  const storedSettings = global.localStorage.getItem(STORAGE_KEY);
  return storedSettings ?
    JSON.parse(storedSettings) :
    {
      autofocus: true,
      hideFunctions: true,
      hideEmptyKeys: false,
      hideLocationData: false,
      hideTypeKeys: false,
    };
}

function reducer(state, element) {
  const newState = {...state, [element.name]: element.checked};

  global.localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  logEvent(
    'tree_view_settings',
    element.checked ? 'enabled' : 'disabled',
    element.name
  );

  return newState;
}

function makeCheckbox(name, settings, updateSettings) {
  return (
    <input
      type="checkbox"
      name={name}
      checked={settings[name]}
      onChange={event => updateSettings(event.target)}
    />
  );
}

export default function Tree({focusPath, ast, parser}) {
  const [settings, updateSettings] = useReducer(reducer, null, initSettings);

  return (
    <div className="tree-visualization container">
      <div className="toolbar">
        <label title="Auto open the node at the cursor in the source code">
          {makeCheckbox('autofocus', settings, updateSettings)}
          Autofocus
        </label>
        &#8203;
        <label>
          {makeCheckbox('hideFunctions', settings, updateSettings)}
          Hide methods
        </label>
        &#8203;
        <label>
          {makeCheckbox('hideEmptyKeys', settings, updateSettings)}
          Hide empty keys
        </label>
        &#8203;
        <label>
          {makeCheckbox('hideLocationData', settings, updateSettings)}
          Hide location data
        </label>
        &#8203;
        <label>
          {makeCheckbox('hideTypeKeys', settings, updateSettings)}
          Hide type keys
        </label>
      </div>
      <ul onMouseLeave={() => {PubSub.publish('CLEAR_HIGHLIGHT');}}>
        <Element
          focusPath={focusPath}
          value={ast}
          level={0}
          parser={parser}
          settings={settings}
        />
      </ul>
    </div>
  );
}

Tree.propTypes = {
  focusPath: PropTypes.array,
  ast: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  parser: PropTypes.object,
};
