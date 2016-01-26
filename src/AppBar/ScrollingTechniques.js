import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import shallowCompare from 'react-addons-shallow-compare';
import blockManager from '../Block/blockManager';

function getHeight(elem) {
  return elem.clientHeight;
}

class ScrollingTechniques extends Component {

  static propTypes = {
    children: React.PropTypes.element.isRequired,
  };

  constructor() {
    super();

    this.state = {
      frames: null,
      flexibleSpaceHeight: -1,
      tabBarHeight: -1,
      toolBarHeight: -1,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    const currentFrame = this.getCurrentFrame(window.scrollY);
    this.processFrame(currentFrame);
    this.refs.scrolling;
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  componentWillUpdate(nextProps, nextState) {
    this.processFrame(this.getCurrentFrame(window.scrollY, nextState.frames), true);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleScroll = (event) => {
    const currentFrame = this.getCurrentFrame(event.target.body.scrollTop);
    this.processFrame(currentFrame);
  };

  getFixedStyle = () => {
    return this.props.mock ? 'relative' : 'fixed';
  };

  processFrame = (currentFrame, force) => {
    if (!force && (this.rqf || currentFrame === null || this.currentFrame === currentFrame)) return;

    this.rqf = requestAnimationFrame(() => {
      this.rqf = null;
      this.currentFrame = currentFrame;

      this.appBar.style.transition = 'none';
      this.appBar.style['padding-top'] = `${this.state.toolBarHeight}px`;
      this.appBar.style.left = '0px';
      this.appBar.style.right = '0px';

      if (this.toolBar.style.position !== this.getFixedStyle()) {
        this.toolBar.style.position = this.getFixedStyle();
        this.toolBar.style.top = '0px';
        this.toolBar.style.left = '0px';
        this.toolBar.style.right = '0px';
      }

      if (currentFrame === 0) {
        this.appBar.style.top = '0px';
        this.appBar.style.position = 'relative';
        this.refs.padding.style.height = `0px`;

        this.toolBar.style.bottom = null;
      } else if (currentFrame === 1) {

        this.appBar.style.top = '0px';
        this.appBar.style.position = 'relative';

        this.refs.padding.style.height = `0px`;

        this.toolBar.style.position = 'absolute';
        this.toolBar.style.top = null;
        this.toolBar.style.bottom = `${this.state.tabBarHeight}px`;

      } else if (currentFrame === -1) {
        this.appBar.style.top = `-${(this.computeFixedOffset(this.state))}px`;
        this.appBar.style.position = this.getFixedStyle();

        this.refs.padding.style.height = `${this.state.flexibleSpaceHeight + this.state.toolBarHeight + this.state.tabBarHeight}px`;

        this.toolBar.style.position = 'absolute';
        this.toolBar.style.top = null;
        this.toolBar.style.bottom = `${this.state.tabBarHeight}px`;

      }
    });
  };

  getCurrentFrame = (scrollY, frames = this.state.frames) => {
    if (frames === null) return null;
    for (let i = 0; i < frames.length; i++) {
      if (scrollY < frames[i]) return i;
    }
    return -1;
  };

  computeFixedOffset = (state) => {
    return this.props.fixed ? state.flexibleSpaceHeight : state.flexibleSpaceHeight + state.toolBarHeight + state.tabBarHeight;
  };

  computeFrames = (state) => {
    if (state.flexibleSpaceHeight === -1 || state.toolBarHeight === -1 || state.tabBarHeight === -1) return null;
    return [state.flexibleSpaceHeight, this.computeFixedOffset(state)];
  };

  registerBlock = (key, elem) => {
    console.log(elem);
    this[key] = ReactDOM.findDOMNode(elem);

    if (elem && this.state[`${key}Height`] !== getHeight(elem)) {
     this.setState((previousState) => {
        const nextState = {
          ...previousState,
          [`${key}Height`]: getHeight(elem),
        };

        const frames = this.computeFrames(nextState);

        return {
          ...nextState,
          frames,
          currentFrame: frames ? this.getCurrentFrame(window.scrollY, frames) : null,
        };
      });
    }
  };

  render() {

    const {
      children,
      ...other,
    } = this.props;

    return (
      <div>
        {React.cloneElement(children, {...other, registerBlock: this.registerBlock})}
        <div ref="padding"></div>
      </div>
    );
  }
};

ScrollingTechniques.displayName = 'ScrollingTechniques(AppBar)';

export default ScrollingTechniques;
