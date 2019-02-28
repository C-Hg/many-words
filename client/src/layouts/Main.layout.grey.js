import React from "react";
import { Switch, Route } from "react-router-dom";
import Curriculum from "../components/Curriculum.component";
import Theme from "../components/Theme.component";
import Learning from "../components/Learning.component";
import Navbar from "../components/Navbar.component";

class MainLayoutGrey extends React.Component {
  render() {
    return (
      <div className="app app-with-navbar-full-screen">
        <Navbar />
        <div className="main-container greyBackground">
          <Switch>
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

export default MainLayoutGrey;
