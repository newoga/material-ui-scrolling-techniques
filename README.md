## material-ui-scrolling-techniques

This project is a work in progress implementation of the [scrolling techniques](https://www.google.com/design/spec/patterns/scrolling-techniques.html) described in the material design spec. It is designed to be used with [material-ui](https://github.com/callemall/material-ui). The goal of this repository is to experiment with the API and various scrolling approaches before officially merging it into material-ui.

In addition to implementing scrolling techniques, this project demonstrates a [composable AppBar](https://github.com/callemall/material-ui/issues/773), which can consist of a `ToolBar`, `FlexibleSpace`, and a `TabBar`. The new `AppBar` also attempts to implement this new approach while maintaining backwards compatibility with the old [AppBar](https://github.com/callemall/material-ui/blob/v0.14.2/src/app-bar.jsx).

```jsx
import AppBar, {FlexibleSpace, TabBar, ToolBar} from 'material-ui-scrolling-techniques/AppBar';

const App = (props) => {
  
  return (
    <AppBar>
      <ToolBar>
        <div>Anything can go here, such as a material-ui ToolBar!</div>
      </ToolBar>
      <FlexibleSpace>
        <div>Anything can go here!</div>
      </FlexibleSpace>
      <TabBar>
        <div>Anything can go here, such as material-ui tabs!</div>
      </TabBar>
    </AppBar>
  );
};
```

The scrolling techniques are implemented by simply wrapping an `<AppBar />` with a `<ScrollingTechniques />` component, something that this project's `<AppCanvas />` component does for you.

```jsx
import AppBar, {FlexibleSpace, TabBar, ToolBar} from 'material-ui-scrolling-techniques/AppBar';
import ScrollingTechniques from 'material-ui-scrolling-techniques/AppBar/ScrollingTechniques';

const App = (props) => {
  
  return (
    <ScrollingTechniques>
      <AppBar>
        <ToolBar>
          <div>Anything can go here, such as a material-ui ToolBar!</div>
        </ToolBar>
        <FlexibleSpace>
          <div>Anything can go here!</div>
        </FlexibleSpace>
        <TabBar>
          <div>Anything can go here, such as material-ui tabs!</div>
        </TabBar>
      </AppBar>
    </ScrollingTechniques>
  );
};
