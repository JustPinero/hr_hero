import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from "./components/Nav";

import HomePage from "./pages/Home";
import ProfilePage from "./pages/Profile"
import NewHeroPage from "./pages/NewHero";
import NoMatchPage from "./pages/NoMatch";
import WelcomePage from "./pages/Welcome"


const Routes = ()=> {
  return (
    <Router>
      <div>
      <Route exact path="/" component={Nav}/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/employees" component={HomePage} />
          <Route exact path="/employees/:id" component={ProfilePage}/>
          <Route exact path="/newemployee" component={NewHeroPage} />
          <Route exact path="/welcome" component={WelcomePage} />
          <Route component={NoMatchPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default Routes;