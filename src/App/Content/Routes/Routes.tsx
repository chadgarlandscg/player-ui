import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Enter } from "../Enter/Enter";
import { Home } from "../Home/Home";
import { NewGame } from "../NewGame/NewGame";

enum Paths {
  Home = '/home',
  RockPaperScissors = '/rock-paper-scissors',
  Enter = '/'
}

const PathToComponent: {[key in Paths]: ReactNode} = {
  [Paths.Home]: <Home/>,
  [Paths.RockPaperScissors]: <NewGame/>,
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