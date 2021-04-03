import React from "react";
import { Router } from "react-router-dom";
import { Routes } from "./components";
import { createBrowserHistory } from "history";
const browserHistory = createBrowserHistory();

function App() {
  return (
    <React.Fragment>
      <Router history={browserHistory}>
        <Routes />
      </Router>
    </React.Fragment>
  );
}

export default App;
