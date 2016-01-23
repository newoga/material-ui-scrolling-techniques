import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';

function block(Wrapped) {
  class Block extends React.Component {
    constructor() {
      super();
    }

    componentDidMount() {
      if (document.readyState === 'complete') {
        this.componentDidUpdate();
      } else {
        window.addEventListener('load', this.componentDidUpdate.bind(this));
      };
    }

    componentWillUnmount() {
      window.removeEventListener('load', this.componentDidUpdate.bind(this));
    }

    componentDidUpdate() {
      if (this.props.registerBlock) this.props.registerBlock(this.refs.block, this.props);
    }

    shouldComponentUpdate(nextProps, nextState) {
      return shallowCompare(this, nextProps, nextState);
    }

    render() {
      const {
        children,
        type = 'div',
        ...other,
      } = this.props;

      return React.createElement(type, {ref: 'block', style: {overflow: 'hidden'}, ...other}, children);
    }

  };

  Block.displayName = `Block(${Wrapped.displayName || Wrapped.name || Wrapped})`;

  return Block;
}

export default block;
