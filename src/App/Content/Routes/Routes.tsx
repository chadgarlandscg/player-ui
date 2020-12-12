import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Home } from "../Home/Home";

enum Paths {
  Home = '/',
}

const PathToComponent: {[key in Paths]: ReactNode} = {
  [Paths.Home]: Home,
}

const RoutedComponents: React.FC = () => {
  return <>
    {Object.entries(PathToComponent).map(([path, component]) => (
      <Route path={path} exact={true}>
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