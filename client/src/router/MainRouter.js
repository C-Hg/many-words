import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Exercise from "../pages/Exercise.page";
import AppWithNavbarRouter from "./AppWithNavbarRouter";

function MainRouter() {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/home" />} />
      <Route exact path="/weak_words" component={Exercise} />
      <Route exact path="/:themeId/:lessonId/test" component={Exercise} />
      <Route path={"/"} component={AppWithNavbarRouter} />} />
    </Switch>
  );
}

export default MainRouter;
