import React from 'react';

const FlexibleSpace = ({children, className, style}) => {
  return (
    <div className={className} style={style}>{children}</div>
  );
};

FlexibleSpace.displayName = 'AppBar.FlexibleSpace';

export default FlexibleSpace;
