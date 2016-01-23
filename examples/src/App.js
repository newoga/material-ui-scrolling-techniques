import React, { Component } from 'react';
import './app.css';

/* material-ui imports */
import Paper from 'material-ui/lib/paper';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import lightBaseTheme from 'material-ui/lib/styles/baseThemes/lightBaseTheme';

import AppBar, {FlexibleSpace, TabBar, ToolBar} from 'material-ui-scrolling-techniques/AppBar';
import AppCanvas, {Content} from 'material-ui-scrolling-techniques/AppCanvas';
import ScrollingTechniques from 'material-ui-scrolling-techniques/AppBar/ScrollingTechniques';

import TextField from 'material-ui/lib/text-field';
import Toggle from 'material-ui/lib/toggle';
import Divider from 'material-ui/lib/divider';
import ActionInfo from 'material-ui/lib/svg-icons/action/info';
import Colors from 'material-ui/lib/styles/colors';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

import LoremIpsum from './LoremIpsum';
// style={{borderLeft: 'solid 1px #d9d9d9', borderBottom: 'solid 1px #d9d9d9' }}

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left">
    <MoreVertIcon color={Colors.grey400} />
  </IconButton>
);

const exampleMenu = ({onChange}) => (
  <IconMenu iconButtonElement={iconButtonElement} onChange={onChange}>
    <MenuItem value="Material UI">Material UI</MenuItem>
    <MenuItem value="Material Spec">Material Spec</MenuItem>
  </IconMenu>
);

const fixedModes = {
  '0': 'Toolbar and Tab bar',
  '1': 'Tab bar',
};

const fixedModeMenu = ({onChange}) => (
  <IconMenu iconButtonElement={iconButtonElement} onChange={onChange}>
    <MenuItem value="0">Toolbar and Tab bar</MenuItem>
    <MenuItem value="1">Tab bar</MenuItem>
  </IconMenu>
);

const toolBars = {
  'legacy': 'Legacy AppBar',
  'search': 'Search',
};

const toolBarMenu = ({onChange}) => (
  <IconMenu iconButtonElement={iconButtonElement} onChange={onChange}>
    <MenuItem value="legacy">{toolBars['legacy']}</MenuItem>
    <MenuItem value="search">{toolBars['search']}</MenuItem>
  </IconMenu>
);

export class App extends Component {

  static childContextTypes = {
    muiTheme: React.PropTypes.object,
  };

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(lightBaseTheme),
    };
  }

  constructor() {
    super();

    this.state = {
      currentExample: 'Material UI',
      currentFixedMode: '0',
      currentToolBar: 'legacy',
      enableScrolling: true,
      enableScrollAway: false,
      flexibleSpaceHeight: 200,
      showFlexibleSpace: true,
      showTabBar: true,
      showToolBar: true,
      slideIndex: 0,
    };
  }

  _toggleFlexibleSpace = () => {
    this.setState({
      showFlexibleSpace: !this.state.showFlexibleSpace,
    });
  };

  _toggleTabBar = () => {
    this.setState({
      showTabBar: !this.state.showTabBar,
    });
  };

  _toggleToolBar = () => {
    this.setState({
      showToolBar: !this.state.showToolBar,
    });
  };

  _toggleScrolling = () => {
    this.setState({
      enableScrolling: !this.state.enableScrolling,
    });
  };

  _toggleScrollAway = () => {
    this.setState({
      enableScrollAway: !this.state.enableScrollAway,
    });
  };

  _updateFlexibleSpaceHeight = (e) => {
    this.setState({
      flexibleSpaceHeight: e.target.value,
    });
  };

  _handleTabChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  renderToolBar = () => {
    return this.state.currentExample === 'Material UI' ?
      <ToolBar testA="testA">{
        this.state.currentToolBar === 'search' ?
          <div style={{padding: 10}}>
            <Paper zDepth={1} style={{paddingLeft: 10}}>
              <TextField hintText="Search" underlineShow={false} />
            </Paper>
          </div> : null
      }</ToolBar> :
      <ToolBar>
        <div className="spec spec-toolbar">
          <p style={{display: 'inline-block'}}>Toolbar</p>
        </div>
      </ToolBar>;
  };

  renderFlexibleSpace = () => {
    return this.state.currentExample == 'Material UI' ?
      <FlexibleSpace testB="testB">
        <div style={{height: this.state.flexibleSpaceHeight}}>
        </div>
      </FlexibleSpace> :
      <FlexibleSpace>
        <div className="spec spec-flexiblespace">
          <p style={{display: 'inline-block'}}>Flexible space</p>
        </div>
      </FlexibleSpace>;
  };

  renderTabBar = () => {
    return this.state.currentExample == 'Material UI' ?
      <TabBar testC="">
        <Tabs
          onChange={this._handleTabChange}
          value={this.state.slideIndex}
          tabItemContainerStyle={{backgroundColor: 'rgba(0,0,0,0)'}}>
          <Tab label="Sample Tab 1" value={0} style={{backgroundColor: 'rgba(0,0,0,0)'}} />
          <Tab label="Sample Tab 2" value={1} style={{backgroundColor: 'rgba(0,0,0,0)'}}/>
          <Tab label="Sample Tab 3" value={2} style={{backgroundColor: 'rgba(0,0,0,0)'}}/>
        </Tabs>
      </TabBar> :
      <TabBar>
        <div className="spec spec-tabbar">
          <p style={{display: 'inline-block'}}>Tab bar</p>
        </div>
      </TabBar>;
  };

  render() {
    return  (
      <AppCanvas scrollingTechniques={this.state.enableScrolling}>
        <AppBar title="App bar and scrolling techniques" zDepth={1}>
          {this.state.showToolBar ? this.renderToolBar() : null}
          {this.state.showFlexibleSpace ? this.renderFlexibleSpace() : null}
          {this.state.showTabBar ? this.renderTabBar() : null}
        </AppBar>
        <Content>
          <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-4 col-sm-6 col-xs-12">
                  <Paper zDepth={1}>
                  <List subheader="Components">
                    <ListItem
                      primaryText="Demo implementation"
                      secondaryText={this.state.currentExample}
                      rightIconButton={exampleMenu({
                        onChange: (e, v) => this.setState({currentExample: v})
                      })} />
                    {this.state.currentExample === 'Material UI' ? <ListItem
                      primaryText="Toolbar implementation"
                      secondaryText={toolBars[this.state.currentToolBar]}
                      rightIconButton={toolBarMenu({
                        onChange: (e, v) => this.setState({currentToolBar: v})
                      })} /> : null
                    }
                  </List>

                  </Paper>
                </div>
                <div className="col-md-4 col-sm-6 col-xs-12">
                  <Paper zDepth={1}>
                  <List subheader="App bar blocks">
                    <ListItem
                      primaryText="Toolbar"
                      rightToggle={<Toggle defaultToggled={this.state.showToolBar} onToggle={this._toggleToolBar} />} />
                    <ListItem
                      primaryText="Flexible space"
                      rightToggle={<Toggle defaultToggled={this.state.showFlexibleSpace} onToggle={this._toggleFlexibleSpace} />} />
                    <ListItem
                      primaryText="Tab bar"
                      rightToggle={<Toggle defaultToggled={this.state.showTabBar} onToggle={this._toggleTabBar} />} />
                    {!this.state.showToolBar && !this.state.showFlexibleSpace && !this.state.showTabBar ? <div>
                      <Divider />
                      <ListItem
                        disabled={true}
                        primaryText="Backwards Compatibility Mode"
                        secondaryText="AppBar works as it did before when no blocks are detected"
                        rightIcon={<ActionInfo color={Colors.red500} />}/>
                      </div> : null
                    }
                  </List>
                  </Paper>
                </div>
                <div className="col-md-4 col-sm-6 col-xs-12">
                  <Paper zDepth={1}>
                  <List subheader="Scrolling techniques">
                    <ListItem
                      primaryText="Scrolling Techniques"
                      secondaryText="Toggle AppBar scrolling techniques"
                      rightToggle={<Toggle defaultToggled={this.state.enableScrolling} onToggle={this._toggleScrolling} />} />
                    <ListItem
                      disabled={true}
                      primaryText="[WIP] Fixed Mode"
                      secondaryText={fixedModes[this.state.currentFixedMode]}
                      rightIconButton={fixedModeMenu({
                        onChange: (e, v) => this.setState({currentFixedMode: v})
                      })} />
                    <ListItem
                      disabled={!this.state.enableScrolling}
                      primaryText="[WIP] Scroll away"
                      secondaryText="Scroll away with content and return when reverse scroll"
                      rightToggle={<Toggle defaultToggled={this.state.enableScrollAway} onToggle={this._toggleScrollAway} />} />
                  </List>
                  </Paper>
                </div>
                <Divider />

                </div>
                <div className="row">
                  <Divider style={{marginTop: 20, marginBottom: 20}}/>
                  <div style={{paddingLeft: 20, paddingRight: 20}}>
                    <LoremIpsum />
                  </div>
                </div>
            </div>
          </div>
          </div>
        </Content>
      </AppCanvas>
    );
  }
}
