import React from "react";
import { Switch, Route } from "react-router-dom";
import Curriculum from "../components/Curriculum.component";
import Theme from "../components/Theme.component";
import Learning from "../components/Learning.component";
import Navbar from "../components/Navbar.component";

function MainLayout({ match }) {
  return (
    <div className="app app-with-navbar-as-menu">
      <Navbar />
      <div className="main-container main-container-as-menu">
        <Switch>
          <Route
            exact
            path={`${match.path}curriculum`}
            component={Curriculum}
          />
          <Route
            exact
            path={`${match.path}:themeId`}
            render={props => (
              <Theme theme={props.match.params.themeId} {...props} />
            )}
          />
          <Route
            exact
            path={`${match.path}:themeId/:lessonId/learn`}
            render={props => (
              <Learning
                lesson={props.match.params.lessonId}
                theme={props.match.params.themeId}
                {...props}
              />
            )}
          />
        </Switch>
      </div>
    </div>
  );
}

export default MainLayout;
