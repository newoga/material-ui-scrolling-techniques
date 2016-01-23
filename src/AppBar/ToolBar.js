import React from 'react';
import LegacyAppBar from 'material-ui/lib/app-bar';

const ToolBar = ({children, zDepth = 0, ...other}) => {
  return children ? children : <LegacyAppBar zDepth={zDepth} {...other} />;
};

ToolBar.displayName = 'AppBar.ToolBar';

export default ToolBar;
