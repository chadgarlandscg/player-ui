import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Enter } from "../Enter/Enter";
import { ConnectedHome } from "../Home/ConnectedHome";
import { NewGame } from "../NewGame/NewGame";

enum Paths {
  Home = '/home',
  NewGame = '/new-game',
  Enter = '/'
}

const PathToComponent: {[key in Paths]: ReactNode} = {
  [Paths.Home]: <ConnectedHome/>,
  [Paths.NewGame]: <NewGame/>,
  [Paths.Enter]: <Enter/>
}

const RoutedComponents: React.FC = () => {
  return <>
    {Object.entries(PathToComponent).map(([path, component], i) => (
      <Route key={i} path={path} exact={true}>
        {component}
      </Route>
    ))}
  </>;
}

export const Routes: React.FC = () => {
  return (
    <Switch>
      <RoutedComponents />
    </Switch>
  );
}