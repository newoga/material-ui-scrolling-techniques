import React from 'react';
import Paper from 'material-ui/lib/paper';
import toClass from 'recompose/toClass'

import FlexibleSpace from './FlexibleSpace';
import TabBar from './TabBar'
import ToolBar from './ToolBar';

import filterUniqueChildren from '../util/filterUniqueChildren';

const defaultProps = {
  zDepth: 1,
};

// Need to swap this out with official root styles from project and theme integration...
const styles = {
  root: {
    zIndex: 1,
    backgroundColor: 'rgb(0, 188, 212)',
    WebkitFontSmoothing: 'antialiased',
  },
};

const AppBar = (props) => {
  console.log('AppBar rendered...');

  const {
    children,
    registerBlock = (elem) => (elem),
    zDepth,
    ...other
  } = props;

  const {
    [FlexibleSpace.displayName]: flexibleSpace,
    [TabBar.displayName]: tabBar,
    [ToolBar.displayName]: toolBar,
  } = filterUniqueChildren(children, FlexibleSpace.displayName, TabBar.displayName, ToolBar.displayName);

  // If none of the new supported child components are provided, render the old AppBar as a ToolBar
  const backwardsCompatibleToolBar = (!flexibleSpace && !tabBar && !toolBar) ?
    React.cloneElement(<ToolBar zDepth={zDepth} rounded={false} />, other) : toolBar ?
    React.cloneElement(toolBar, other) : null;

  return (
    <header>
      <Paper ref={(elem) => registerBlock('appBar', elem)} zDepth={zDepth} rounded={false} style={styles.root}>
        <div ref={(elem) => registerBlock('toolBar', elem)}>{backwardsCompatibleToolBar}</div>
        <div ref={(elem) => registerBlock('flexibleSpace', elem)}>{flexibleSpace}</div>
        <div ref={(elem) => registerBlock('tabBar', elem)}>{tabBar}</div>
      </Paper>
    </header>
  );
};

AppBar.displayName = 'AppBar';
AppBar.defaultProps = defaultProps;

export default toClass(AppBar);
