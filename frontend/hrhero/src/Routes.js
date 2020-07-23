import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

const Routes = ()=> {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/newemployee" component={NewEmployee} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default Routes;