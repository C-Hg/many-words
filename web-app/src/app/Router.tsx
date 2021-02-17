import React, { ReactElement } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import About from "../about/About.page";
import Exercise from "../exercise/Exercise.page";
import Home from "../home/Home.router";
import LandingPage from "../landing/Landing.page";

const Router = (): JSX.Element => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(): ReactElement => <Redirect to="/home" />}
      />
      <Route exact path="/about" component={About} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/learn" component={Exercise} />
      <Route exact path="/welcome" component={LandingPage} />
    </Switch>
  );
};

export default Router;
