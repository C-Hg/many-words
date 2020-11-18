import React, { ReactElement } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import About from "../about/About.page";
import Topic from "../curriculum/topic/Topic.page";
import Exercise from "../exercise/Exercise.page";
import Home from "../home/Home.page";

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
      <Route exact path="/weak_words" component={Exercise} />
      <Route exact path="/:themeId/:lessonId/test" component={Exercise} />
    </Switch>
  );
};

export default Router;
