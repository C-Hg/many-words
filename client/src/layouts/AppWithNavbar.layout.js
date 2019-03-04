import React from "react";
import { Switch, Route } from "react-router-dom";
import Curriculum from "../components/Curriculum.component";
import About from "../components/About.component";
import Home from "../components/Home.component";
import Theme from "../components/Theme.component";
import Navbar from "../components/Navbar.component";
import Learning from "../components/Learning.component";

class AppWithNavbar extends React.Component {
  render() {
    return (
      <div className="app app-with-navbar-full-screen">
        <Navbar />
        <div className="main-container whiteBackground">
          <Switch>
            <Route
              exact
              path={`${this.props.match.path}about`}
              component={About}
            />
            <Route
              exact
              path={`${this.props.match.path}home`}
              render={props => (
                <Home
                  logoutUser={this.props.logoutUser}
                  logoutAndDeleteUser={this.props.logoutAndDeleteUser}
                  loginUser={this.props.loginUser}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path={`${this.props.match.path}curriculum`}
              render={props => (
                <Curriculum
                  startWeakWords={this.props.startWeakWords}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path={`${this.props.match.path}:themeId`}
              render={props => (
                <Theme
                  theme={props.match.params.themeId}
                  startWeakWords={this.props.startWeakWords}
                  {...props}
                />
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

export default AppWithNavbar;
