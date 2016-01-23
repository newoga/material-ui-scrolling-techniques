import React, {Component} from 'react';

function blockManager(mappingFunctions) {

  return function wrapWithBlockMananger(Wrapped) {

    return class BlockManager extends Component {
      render() {

        const mappingRegisterFunctions = {};

        Object.keys(mappingFunctions).map((key) => {
          return mappingRegisterFunctions[key] = {
            registerBlock: mappingFunctions[key],
          };
        });

        return React.createElement(Wrapped, {...this.props, ...mappingRegisterFunctions});
      }
    };
  };
}

export default blockManager;
