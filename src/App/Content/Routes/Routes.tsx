import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Home } from "../Home/Home";
import { HomeRoute } from "./HomeRoute";

export const Routes: React.FC = () => {
  return (
    <div>
      <Switch>
        <HomeRoute />
      </Switch>
    </div>
  );
}