import React from 'react'
import {publish} from '../../../utils/pubsub.js';

export default function GotoNode(props) {
    const range = props.treeAdapter.getRange(props.value);

    if((!props.treeAdapter.isArray(props.value) && !props.treeAdapter.isObject(props.value)) || props.treeAdapter.getRange(props.value) == undefined) {
        return (
            <></>
        );
    }

    function goto() {
        const range = props.treeAdapter.getRange(props.value)

        publish('SCROLL_TO_NODE', {value: props.value, range})
    }
    
    return (
        <span className="compact placeholder x" style={{marginLeft: "5px"}} onClick={goto}>goto</span>
    )
}
