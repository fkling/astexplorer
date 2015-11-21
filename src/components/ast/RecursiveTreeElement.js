import React from 'react';

/**
 * This is a higher order component the prevents infinite recursion when opening
 * the element tree.
 */
export default function RecursiveTreeElement(Element) {
  const openValues = new WeakMap();

 function addValue(value) {
    if (openValues.has(value)) {
      openValues.set(value, openValues.get(value) + 1);
    } else {
      openValues.set(value, 1);
    }
  }

  function removeValue(value) {
    let n = openValues.get(value) - 1;
    if (n === 0) {
      openValues.delete(value);
    } else {
      openValues.set(value, n);
    }
  }

  return class extends React.Component {
    constructor(props) {
      super(props);
      let deepOpen = props.deepOpen;
      if (props.value && typeof props.value === 'object') {
        if (openValues.has(props.value)) {
          deepOpen = false;
        }
        addValue(props.value);
      }
      this.state = {deepOpen};
    }

    componentWillUnmount() {
      const {value} = this.props;
      if (value && typeof value === 'object') {
        removeValue(value);
      }
    }

    componentWillReceiveProps(props) {
      let deepOpen = props.deepOpen;
      if (!this.props.value !== props.value) {
        if (this.props.value && typeof this.props.value === 'object') {
          removeValue(this.props.value);
        }
        if (props.value && typeof props.value === 'object') {
          if (openValues.has(props.value)) {
            deepOpen = false;
          }
          addValue(props.value);
        }
      }
      this.setState({deepOpen});
    }

    render() {
      const {props} = this;
      return (
        <Element
          {...props}
          deepOpen={this.state.deepOpen}
        />
      );
    }
  };
}
