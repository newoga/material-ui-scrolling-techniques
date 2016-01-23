import React, { Component } from 'react';
import filterUniqueChildren from '../util/filterUniqueChildren';

import AppBar from '../AppBar';
import ScrollingTechniques from '../AppBar/ScrollingTechniques';
import Content from './Content';

class AppCanvas extends Component {

  constructor() {
    super();
  }

  render() {

    const style = {
      height: '100%',
      position: 'relative',
    };

    const {
      children,
      scrollingTechniques,
    } = this.props;

    const {
      [AppBar.displayName]: appBar,
      [Content.displayName]: content,
    } = filterUniqueChildren(this.props.children, AppBar.displayName, Content.displayName);

    const scrollingAppBar = scrollingTechniques ? <ScrollingTechniques fixed={true}>{appBar}</ScrollingTechniques> : appBar;

    return (
      <div style={style}>
        {scrollingAppBar}
        {content}
      </div>
    );
  }
}

export default AppCanvas;
