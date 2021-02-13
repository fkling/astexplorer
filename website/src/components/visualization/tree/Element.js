import CompactArrayView from './CompactArrayView';
import CompactObjectView from './CompactObjectView';
import PropTypes from 'prop-types';
import {publish} from '../../../utils/pubsub.js';
import React from 'react';
import {useSelectedNode} from '../SelectedNodeContext.js';
import focusNodes from '../focusNodes.js'

import cx from '../../../utils/classnames.js';
import stringify from '../../../utils/stringify';

const {useState, useRef, useMemo, useCallback, useEffect} = React;

function usePrevious(value, initialValue) {
  const ref = useRef(initialValue);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

/*
// For debugging
function log(f) {
  return function(a, b) {
    let result = f.call(this, a,b);
    console.log(a.name, a.name || a.value && a.value.type, 'Updates', result);
    return result;
  };
}
*/

const OPEN_STATES = {
  DEFAULT: 0,
  OPEN: 1,
  DEEP_OPEN: 2,
  FOCUS_OPEN: 3,
  CLOSED: 4,
};

const EVENTS = {
  CLICK_SELF: 0,
  CLICK_DESCENDANT: 1,
  GAIN_FOCUS: 2,
  LOOSE_FOCUS: 3,
  DEEP_OPEN: 4,
};

function transition(currentState, event) {
  switch (currentState) {
    case OPEN_STATES.DEFAULT:
    case OPEN_STATES.CLOSED:
      switch (event) {
        case EVENTS.DEEP_OPEN:
          return OPEN_STATES.DEEP_OPEN;
        case EVENTS.GAIN_FOCUS:
          return OPEN_STATES.FOCUS_OPEN;
        case EVENTS.LOOSE_FOCUS:
          return OPEN_STATES.DEFAULT;
      }
      break;

    case OPEN_STATES.OPEN:
      switch (event) {
        case EVENTS.DEEP_OPEN:
          return OPEN_STATES.DEEP_OPEN;
        case EVENTS.GAIN_FOCUS:
        case EVENTS.LOOSE_FOCUS:
          return currentState;
      }
      break;

    case OPEN_STATES.DEEP_OPEN:
      return OPEN_STATES.DEEP_OPEN;

    case OPEN_STATES.FOCUS_OPEN:
      switch (event) {
        case EVENTS.GAIN_FOCUS:
          return OPEN_STATES.FOCUS_OPEN;
        case EVENTS.LOOSE_FOCUS:
          return OPEN_STATES.DEFAULT;
        case EVENTS.DEEP_OPEN:
          return OPEN_STATES.DEEP_OPEN;
      }
      break;
  }
}

function useOpenState(openFromParent, isInRange) {
  const previousOpenFromParent = usePrevious(openFromParent, false);
  const wasInRange = usePrevious(isInRange, false);
  const [ownOpenState, setOwnOpenState] = useState(OPEN_STATES.DEFAULT);
  const previousOwnOpenState = usePrevious(ownOpenState, OPEN_STATES.DEFAULT);
  const previousComputedOpenState = useRef(OPEN_STATES.DEFAULT);
  let computedOpenState = previousComputedOpenState.current;

  if(ownOpenState !== previousOwnOpenState) {
    computedOpenState = ownOpenState;
  } else if (wasInRange !== isInRange) {
    computedOpenState = transition(
      previousComputedOpenState.current,
      isInRange && !wasInRange ? EVENTS.GAIN_FOCUS : EVENTS.LOOSE_FOCUS,
    );
    if (!isInRange && wasInRange && ownOpenState === OPEN_STATES.CLOSED) {
      setOwnOpenState(OPEN_STATES.DEFAULT);
    }
  } else if (openFromParent && !previousOpenFromParent) {
    computedOpenState = transition(
      previousComputedOpenState.current,
      EVENTS.DEEP_OPEN,
    );
  }

  useEffect(() => {
    previousComputedOpenState.current = computedOpenState;
  });

  return [ computedOpenState, setOwnOpenState ];
}

const Element = React.memo(function Element({
  name,
  value,
  computed,
  open,
  level,
  treeAdapter,
  autofocus,
  isInRange,
  hasChildrenInRange,
  selected,
  onClick,
  position,
}) {
  const opensByDefault = useMemo(
    () => treeAdapter.opensByDefault(value, name),
    [treeAdapter, value, name],
  ) || level === 0;
  const [openState, setOpenState] = useOpenState(
    open,
    autofocus && (isInRange || hasChildrenInRange),
  );
  const element = useRef();
  if (autofocus && isInRange && !hasChildrenInRange) {
    focusNodes('add', element);
  }

  const isOpen = openState === OPEN_STATES.DEFAULT ?
    opensByDefault :
    openState !== OPEN_STATES.CLOSED;

  const onToggleClick = useCallback(
    event => {
      const shiftKey = event.shiftKey;
      const newOpenState = shiftKey ? OPEN_STATES.DEEP_OPEN : (isOpen ? OPEN_STATES.CLOSED : OPEN_STATES.OPEN);
      if (onClick) {
        onClick(newOpenState, true);
      }
      setOpenState(newOpenState);
    },
    [onClick, isOpen],
  );

  const range = treeAdapter.getRange(value);
  let onMouseOver;
  let onMouseLeave;

  // enable highlight on hover if node has a range
  if (range && level !== 0) {
    onMouseOver = event => {
      event.stopPropagation();
      publish('HIGHLIGHT', {node: value, range});
    };

    onMouseLeave = event => {
      event.stopPropagation();
      publish('CLEAR_HIGHLIGHT', {node: value, range});
    };
  }

  const clickHandler = useCallback(
    () => {
      setOpenState(OPEN_STATES.OPEN);
      if (onClick) {
        onClick(OPEN_STATES.OPEN);
      }
    },
    [onClick],
  );

  function renderChild(key, value, parent, name, computed) {
    if (treeAdapter.isArray(value) || treeAdapter.isObject(value) || typeof value === 'function') {
      const ElementType = typeof value === 'function' ? FunctionElement : ElementContainer;
      return (
        <ElementType
          key={key}
          name={name}
          open={openState === OPEN_STATES.DEEP_OPEN}
          value={value}
          computed={computed}
          level={level + 1}
          treeAdapter={treeAdapter}
          autofocus={autofocus}
          parent={parent}
          onClick={clickHandler}
          position={position}
        />
      );
    }
    return (
      <PrimitiveElement
        key={key}
        name={name}
        value={value}
        computed={computed}
      />
    );
  }

  let valueOutput = null;
  let content = null;
  let prefix = null;
  let suffix = null;
  let showToggler = false;

  if (value && typeof value === 'object') {
    // Render a useful name for object like nodes
    if (!treeAdapter.isArray(value)) {
      const nodeName = treeAdapter.getNodeName(value);
      if (nodeName) {
        valueOutput =
          <span className="tokenName nc" onClick={onToggleClick}>
            {nodeName}{' '}
            {selected ?
              <span className="ge" style={{fontSize: '0.8em'}}>
                {' = $node'}
              </span> :
              null
            }
          </span>
      }
    }

    if (typeof value.length === 'number') {
      if (value.length > 0 && isOpen) {
        prefix = '[';
        suffix = ']';
        const node = value;
        let elements = Array.from(treeAdapter.walkNode(value))
          .filter(({key}) => key !== 'length')
          .map(({key, value, computed}) => renderChild(
            key,
            value,
            node,
            Number.isInteger(+key) ? undefined : key,
            computed,
          ));
        content = <ul className="value-body">{elements}</ul>;
      } else {
        valueOutput =
          <span>
            {valueOutput}
            <CompactArrayView
              array={value}
              onClick={onToggleClick}
            />
          </span>;
      }
      showToggler = value.length > 0;
    } else {
      if (isOpen) {
        prefix = '{';
        suffix = '}';
        const node = value;
        let elements = Array.from(treeAdapter.walkNode(value))
          .map(({key, value, computed}) => renderChild(
            key,
            value,
            node,
            key,
            computed,
          ));
        content = <ul className="value-body">{elements}</ul>;
        showToggler = elements.length > 0;
      } else {
        let keys = Array.from(treeAdapter.walkNode(value), ({key}) => key);
        valueOutput =
          <span>
            {valueOutput}
            <CompactObjectView
              onClick={onToggleClick}
              keys={keys}
            />
          </span>;
        showToggler = keys.length > 0;
      }
    }
  }

  let classNames = cx({
    entry: true,
    highlighted: isInRange && (!hasChildrenInRange || !isOpen) || !isInRange && hasChildrenInRange && !isOpen,
    toggable: showToggler,
    open: isOpen,
  });
  return (
    <li
      ref={element}
      className={classNames}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}>
      {name ? <PropertyName name={name} computed={computed} onClick={onToggleClick} /> : null}
      <span className="value">
        {valueOutput}
      </span>
      {prefix ? <span className="prefix p">&nbsp;{prefix}</span> : null}
      {content}
      {suffix ? <div className="suffix p">{suffix}</div> : null}
    </li>
  );
},
(prevProps, nextProps) => {
  return prevProps.name === nextProps.name &&
    prevProps.value === nextProps.value &&
    prevProps.computed === nextProps.computed &&
    prevProps.open === nextProps.open &&
    prevProps.level === nextProps.level &&
    prevProps.treeAdapter === nextProps.treeAdapter &&
    prevProps.autofocus === nextProps.autofocus &&
    prevProps.selected === nextProps.selected &&
    prevProps.onClick === nextProps.onClick &&
    prevProps.isInRange === nextProps.isInRange &&
    prevProps.hasChildrenInRange === nextProps.hasChildrenInRange &&
    //
    ((nextProps.isInRange || nextProps.hashChildrenInRange) && prevProps.position === nextProps.position);
});

Element.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
  computed: PropTypes.bool,
  open: PropTypes.bool,
  level: PropTypes.number,
  treeAdapter: PropTypes.object.isRequired,
  autofocus: PropTypes.bool,
  parent: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

const NOT_COMPUTED = {};

const FunctionElement = React.memo(function FunctionElement(props) {
  const [computedValue, setComputedValue] = useState(NOT_COMPUTED);
  const [error, setError] = useState(null);
  const {name, value, parent, computed, treeAdapter} = props;

  if (computedValue !== NOT_COMPUTED) {
    if (treeAdapter.isArray(computedValue) || treeAdapter.isObject(computedValue)) {
      return (
        <ElementContainer
          {...props}
          value={computedValue}
          level={props.level + 1}
        />
      );
    }
    return (
      <PrimitiveElement
        name={name}
        value={computedValue}
        computed={computed}
      />
    );
  }

  return (
    <li className="entry">
      {name ? <PropertyName name={name} computed={computed} /> : null}
      <span className="value">
        <span
          className="ge invokeable"
          title="Click to invoke function"
          onClick={() => {
            try {
              const computedValue = value.call(parent);
              console.log(computedValue); // eslint-disable-line no-console
              setComputedValue(computedValue);
            } catch(err) {
              console.error(`Unable to run "${name}": `, err.message); // eslint-disable-line no-console
              setError(err);
            }
          }}>
          (...)
        </span>
      </span>
      {error  ?
        <span>
          {' '}
          <i
            title={error.message}
            className="fa fa-exclamation-triangle"
          />
        </span> :
        null
      }
    </li>
  );
});

FunctionElement.propTypes = Element.propTypes;

const PrimitiveElement = React.memo(function PrimitiveElement({
  name,
  value,
  computed,
}) {
  return (
    <li className="entry">
      {name ? <PropertyName name={name} computed={computed} /> : null}
      <span className="value">
        <span className="s">{stringify(value)}</span>
      </span>
    </li>
  );
});

PrimitiveElement.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
  computed: PropTypes.bool,
};

const PropertyName = React.memo(function PropertyName({name, computed, onClick}) {
  return (
    <span className="key">
      <span className="name nb" onClick={onClick}>
        {computed ? <span title="computed">*{name}</span> : name }
      </span>
      <span className="p">:&nbsp;</span>
    </span>
  );
});

PropertyName.propTypes = {
  name: PropTypes.string,
  computed: PropTypes.bool,
  onClick: PropTypes.func,
};

export default function ElementContainer(props) {
  const [selected, setSelected] = useState(false);
  const setSelectedNode = useSelectedNode();
  const isInRange = props.treeAdapter.isInRange(props.value, props.name, props.position);
  const onClick = useCallback(
    (state, own) => {
      if (own) {
        if (state === OPEN_STATES.CLOSED) {
          setSelectedNode(null);
          setSelected(false);
        } else {
          setSelectedNode(props.value, () => setSelected(false));
          setSelected(true);
        }
      }
      if (props.onClick) {
        props.onClick(state);
      }
    },
    [props.value, props.onClick],
  );

  return (
    <Element
      {...props}
      selected={selected}
      hasChildrenInRange={
        props.treeAdapter.hasChildrenInRange(props.value, props.name, props.position)
      }
      isInRange={isInRange}
      onClick={onClick}
    />
  );
}

ElementContainer.propTypes = Element.propTypes;
