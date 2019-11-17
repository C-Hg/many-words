import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "../home/Home.page";
import Theme from "../pages/Theme.page";
import Curriculum from "../pages/Curriculum.page";
import Learning from "../pages/Learning.page";
import Exercise from "../exercise/Exercise.page";
import About from "../about/About.page";

// TODO: clean the router, add a level so :themeId is not confused with about, home...
function Router() {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/home" />} />
      <Route exact path="/about" component={About} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/curriculum" component={Curriculum} />
      <Route exact path="/weak_words" component={Exercise} />
      <Route exact path="/:themeId" component={Theme} />
      <Route exact path="/:themeId/:lessonId/learn" component={Learning} />
      <Route exact path="/:themeId/:lessonId/test" component={Exercise} />
    </Switch>
  );
}

export default Router;
