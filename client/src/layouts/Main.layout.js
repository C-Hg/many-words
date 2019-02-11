import React from "react";
import { Switch, Route } from "react-router-dom";
import Curriculum from "../components/Curriculum.component";
import Theme from "../components/Theme.component";
import Learning from "../components/Learning.component";
import Navbar from "../components/Navbar.component";
import Home from "../components/Home.component";

class MainLayout extends React.Component {
  render() {
    return (
      <div className="app app-with-navbar-full-screen">
        <Navbar />
        <div className="main-container main-container-full-screen">
          <Switch>
            <Route
              exact
              path={`${this.props.match.path}home`}
              render={props => (
                <Home
                  logoutUser={this.props.logoutUser}
                  loginUser={this.props.loginUser}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path={`${this.props.match.path}curriculum`}
              component={Curriculum}
            />
            <Route
              exact
              path={`${this.props.match.path}:themeId`}
              render={props => (
                <Theme theme={props.match.params.themeId} {...props} />
              )}
            />
            <Route
              exact
              path={`${this.props.match.path}:themeId/:lessonId/learn`}
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

export default MainLayout;
