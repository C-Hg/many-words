import React from "react";
import { Route } from "react-router-dom";
import Navbar from "../components/Navbar.component";
import "../components/styles/Exercise.scss";
import Exercise from "../components/Exercise.component";

function ExerciseLayout({ match }) {
  return (
    <div className="app">
      <Navbar />
      <div className="main-container .main-container-as-exercise">
        <Route
          exact
          path={match.path}
          render={props => (
            <Exercise
              lesson={props.match.params.lessonId}
              theme={props.match.params.themeId}
              subtheme={props.match.params.subthemeId}
              {...props}
            />
          )}
        />
      </div>
    </div>
  );
}

export default ExerciseLayout;
