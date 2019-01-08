import React from "react";
import { Switch, Route } from "react-router-dom";
import Curriculum from "../components/Curriculum.component";
import Theme from "../components/Theme.component";
import Subtheme from "../components/Subtheme.component";
import Learning from "../components/Learning.component";
import Navbar from "../components/Navbar.component";
import "../App.scss";

function MainLayout({ match }) {
  return (
    <div className={"app app-with-navbar"}>
      <Navbar />
      <div className={"main-container main-container-as-menu"}>
        <Switch>
          <Route exact path={match.path} component={Curriculum} />
          <Route
            exact
            path={`${match.path}:themeId`}
            render={props => (
              <Theme theme={props.match.params.themeId} {...props} />
            )}
          />
          <Route
            exact
            path={`${match.path}:themeId/:subthemeId`}
            render={props => (
              <Subtheme
                theme={props.match.params.themeId}
                subtheme={props.match.params.subthemeId}
                {...props}
              />
            )}
          />
          <Route
            exact
            path={`${match.path}:themeId/:subthemeId/:lessonId/learn`}
            render={props => (
              <Learning lesson={props.match.params.lessonId} {...props} />
            )}
          />
        </Switch>
      </div>
    </div>
  );
}

export default MainLayout;
