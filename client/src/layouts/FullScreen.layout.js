import React from "react";
import { Route } from "react-router-dom";
import "../components/styles/Exercise.scss";
import Exercise from "../components/Exercise.component";

function FullScreenLayout({ match }) {
  return (
    <div className="app">
      <div className="main-container .main-container-full-screen">
        <Route
          exact
          path={match.path}
          render={props => (
            <Exercise
              lesson={props.match.params.lessonId}
              theme={props.match.params.themeId}
              {...props}
            />
          )}
        />
      </div>
    </div>
  );
}

export default FullScreenLayout;
