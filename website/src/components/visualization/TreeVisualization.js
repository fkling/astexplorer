import PropTypes from 'prop-types';
import React, { cloneElement, Fragment } from 'react';
import {publish, subscribe} from '../../utils/pubsub.js';
import {logEvent} from '../../utils/logger';
import {treeAdapterFromParseResult} from '../../core/TreeAdapter.js';
import TreeD3 from 'react-d3-tree';
import _ from 'lodash'

import './css/treeVisualization.css'

const {useReducer, useMemo, useEffect,createRef} = React;

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
    element.name,
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

export default function TreeVisualization({parseResult, position}) {
  const [settings, updateSettings] = useReducer(reducer, null, initSettings);
  const treeAdapter = useMemo(
    () => treeAdapterFromParseResult(parseResult, settings),
    [parseResult.treeAdapter, settings],
  );

  let TreeRef = createRef();

  // is the node in the range
  function isInRange(node){
    if(node === null || position === null) return false
    return treeAdapter.isInRange(node, node.name, position) || treeAdapter.hasChildrenInRange(node, node.name, position)
  }

  function walk(node,parentNode,preName){
    let rsl = {}
    rsl.name = preName === undefined ?  treeAdapter.getNodeName(node) : preName
    rsl.name = rsl.name === undefined ? '' : rsl.name + ''
    let keysObj = Array.from(treeAdapter.walkNode(node))
      .filter(({key}) => key !== 'length') || []
    rsl.node = parentNode || node
    rsl.children = []
    if(typeof node === 'object') {
        keysObj.forEach(item=>{
          if(Array.isArray(item.value)){
            let tempArr = []
            item.value.forEach(secItem=>{
              secItem !== null && secItem !== undefined && tempArr.push(walk(secItem))
            })
            rsl.children.push({name:item.key,children:tempArr,node:node})
          }else if(typeof item.value === 'object') {
            rsl.children.push(walk(item.value,undefined,item.key))       
          } else {
            rsl.children.push({name:item.key + ':' + item.value,node:node})
          }
        })
    } else {
      rsl.name = node === undefined ? '' : node + ''
      rsl.node = parentNode || null
      delete rsl.children
    }
    return rsl
  }
  let cloneParseResult = _.cloneDeep(parseResult)
  const orgChart = [walk(cloneParseResult.ast,cloneParseResult.ast)]

  function nodeMouseOver(node,event){
    event.stopPropagation();
    let data = node.nodeDatum
    let range = treeAdapter.getRange(data.node);
    if(range && data.__rd3t.depth !== 0) publish('HIGHLIGHT', {node: data.node, range});
  }

  function nodeMouseOut(node,event){
    event.stopPropagation();
    let data = node.nodeDatum
    let range = treeAdapter.getRange(data.node);
    if(range && data.__rd3t.depth !== 0) publish('CLEAR_HIGHLIGHT', {node: data.node, range});
  }

  function nodeClick(node,event){
    event.stopPropagation();
    node.toggleNode()
  }

  let top = null
  let inRangeNodes = []
  let width = document.documentElement.clientWidth/2
  let height = document.documentElement.clientHeight/2
  let treeVisualizationContainer = document.getElementById('treeVisualizationContainer')
  if(treeVisualizationContainer) {
    width = document.getElementById('treeVisualizationContainer').clientWidth
    height = document.getElementById('treeVisualizationContainer').clientHeight
  }
  
  useEffect(()=>{
    let targetNode = null
    inRangeNodes.forEach(item=>{
      if(targetNode === null) {
        targetNode = item
      }else if(targetNode.hierarchyPointNode.depth < item.hierarchyPointNode.depth ) {
        targetNode = item
      }
      item.nodeDatum.__rd3t.collapsed = false
    })
    setTimeout(() => {
      if(targetNode) {
        let [targetG,transform,position] = [null,'','']
        targetG = document.getElementById(targetNode.nodeDatum.__rd3t.id)
        targetG && (transform = targetG.getAttribute('transform') || '')
        transform && (position = transform.replace(/^translate\(/,'').replace(/\)$/,''))
        position = position.split(',').map(item=>Number(item))
        targetNode.hierarchyPointNode.x = position[0]
        targetNode.hierarchyPointNode.y = position[1]
        TreeRef && targetNode && TreeRef.current.centerNode(targetNode.hierarchyPointNode)
        inRangeNodes.length === 0 && top !== null && TreeRef.current.centerNode(top.hierarchyPointNode)
      }
    }, 100);
    subscribe('PANEL_RESIZE', () => {
      let treeVisualizationContainer = document.getElementById('treeVisualizationContainer')
      if(treeVisualizationContainer) {
        width = document.getElementById('treeVisualizationContainer').clientWidth
        height = document.getElementById('treeVisualizationContainer').clientHeight
      }
    })
  })
  
  function renderNode(node){
    if(top === null) top = node
    let nodeData = node.nodeDatum.node
    if(node.nodeDatum.node && isInRange(nodeData)){
      inRangeNodes.push(node)
    }
    return (
      <Fragment>
        <circle 
          className={[nodeData && (isInRange(nodeData)) ? 'isInRange' :null].join(' ')}
          onMouseOver={nodeMouseOver.bind(this,node)} 
          onMouseLeave={nodeMouseOut.bind(this,node)} 
          onClick={nodeClick.bind(this,node)}
          r="15">
        </circle>
          <foreignObject x='20' y='-10' width="180" height="130">
            <p 
              title={node.nodeDatum && node.nodeDatum.name} 
              style={{'overflowWrap': 'break-word',
                      fontWeight:'666',
                      width:'100%',
                      'fontSize':'1.3em',
                      'margin':'0',
                      'overflow':'hidden',
                      'textOverflow':'ellipsis',
                      'display':'-webkit-box',
                      'WebkitLineClamp': '2',
                      'WebkitBoxOrient': 'vertical'}}>
                {node.nodeDatum && node.nodeDatum.name}
            </p>
          </foreignObject>
      </Fragment>
    )
  }

  return (
    <div className="tree-visualization container" id='treeVisualizationContainer'>
      <div className="toolbar">
        <label title="Auto open the node at the cursor in the source code">
          {makeCheckbox('autofocus', settings, updateSettings)}
          Autofocus
        </label>
        &#8203;
        {treeAdapter.getConfigurableFilters().map(filter => (
          <span key={filter.key}>
            <label>
              {makeCheckbox(filter.key, settings, updateSettings)}
              {filter.label}
            </label>
            &#8203;
          </span>
        ))}
      </div>
      <div id="treeWrapper" style={{ width: '100%', height: '100%' }}>
        <TreeD3 data={orgChart} orientation={'vertical'}
        ref= {TreeRef}
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
        separation={{nonSiblings:2,siblings:1.6}}
        renderCustomNodeElement={renderNode}
        zoom={0.5}
        dimensions={{height: height, width: width}}
        initialDepth={1}
        />
      </div>
    </div>
  );
}

TreeVisualization.propTypes = {
  parseResult: PropTypes.object,
  position: PropTypes.number,
};
