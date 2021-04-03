import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Login, UserList } from "../views/";
import { useUser } from "../context/user.context";

const Routes = () => {
  const { token } = useUser();
  return (
    <Switch>
      {token ? (
        <Redirect from="/login" to="/user" />
      ) : (
        <>
          <Redirect from="*" to="/login" />
          <Route component={Login} exact path="/login" />
        </>
      )}
      <Route component={UserList} exact path="/user" />
    </Switch>
  );
};

export default Routes;
