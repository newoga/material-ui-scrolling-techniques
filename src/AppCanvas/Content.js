import React, { Component } from 'react';
// style={{marginTop: 10}}
const Content = ({children}) => {
  return (
    <main>
      {children}
    </main>
  );
};

Content.displayName = 'AppCanvas.Content';

export default Content;
