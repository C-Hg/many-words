import React from "react";
import { Switch, Route } from "react-router-dom";
import Curriculum from "../pages/Curriculum.page";
import About from "../pages/About.page";
import Home from "../pages/Home.page";
import Theme from "../pages/Theme.page";
import Navbar from "../components/navbar/Navbar.component";
import Learning from "../pages/Learning.page";

class AppWithNavbarRouter extends React.Component {
  render() {
    return (
      <div className="app app-with-navbar-full-screen">
        <Navbar />
        <div className="main-container whiteBackground">
          <Switch>
            <Route exact path={`/about`} component={About} />
            <Route exact path={`/home`} component={Home} />
            <Route exact path={`/curriculum`} component={Curriculum} />
            <Route exact path={`/:themeId`} component={Theme} />
            <Route
              exact
              path={`/:themeId/:lessonId/learn`}
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
}

export default AppWithNavbarRouter;
