import React from "react";
import { Route, Switch } from "react-router-dom";
import { Login } from "../views/";

const Routes = () => {
  return (
    <Switch>
      <Route component={Login} exact path="/login" />
    </Switch>
  );
};

export default Routes;
