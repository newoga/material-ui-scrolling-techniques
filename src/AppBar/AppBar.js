import React from 'react';
import Paper from 'material-ui/lib/paper';

import FlexibleSpace from './FlexibleSpace';
import TabBar from './TabBar'
import ToolBar from './ToolBar';
import block from './block';

import filterUniqueChildren from '../util/filterUniqueChildren';

const AppBarBlock = block('AppBar');
const ToolBarBlock = block(ToolBar);
const FlexibleSpaceBlock = block(FlexibleSpace);
const TabBarBlock = block(TabBar);

const defaultProps = {
  zDepth: 1,
};

const AppBar = ({_appBarBlock, _flexibleSpaceBlock, _tabBarBlock, _toolBarBlock, children, zDepth, _test, ...other}) => {

  // Need to swap this out with official root styles from project and theme integration...
  const styles = {
    root: {
      zIndex: 1,
      backgroundColor: 'rgb(0, 188, 212)',
      WebkitFontSmoothing: 'antialiased',
    },
  };

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
      <AppBarBlock type={Paper} zDepth={zDepth} rounded={false} style={styles.root} {..._appBarBlock}>
          <ToolBarBlock {..._toolBarBlock}>{backwardsCompatibleToolBar}</ToolBarBlock>
          <FlexibleSpaceBlock {..._flexibleSpaceBlock}>{flexibleSpace}</FlexibleSpaceBlock>
          <TabBarBlock {..._tabBarBlock}>{tabBar}</TabBarBlock>
      </AppBarBlock>
    </header>
  );
};

AppBar.displayName = 'AppBar';
AppBar.defaultProps = defaultProps;

export default AppBar;
