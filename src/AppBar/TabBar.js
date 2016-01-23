import React from 'react';

const TabBar = ({children, className, style}) => {
  return (
    <div className={className} style={style}>{children}</div>
  );
};

TabBar.displayName = 'AppBar.TabBar';

export default TabBar;
