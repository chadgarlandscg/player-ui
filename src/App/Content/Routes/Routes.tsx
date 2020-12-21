import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Home } from "../Home/Home";
import { NewGame } from "../NewGame/NewGame";

enum Paths {
  Home = '/',
  RockPaperScissors = '/rock-paper-scissors'
}

const PathToComponent: {[key in Paths]: ReactNode} = {
  [Paths.Home]: <Home/>,
  [Paths.RockPaperScissors]: <NewGame/>
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