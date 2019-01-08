import React from "react";
import { Route } from "react-router-dom";
import Navbar from "../components/Navbar.component";
import "../App.scss";
import Exercise from "../components/Exercise.component";

function ExerciseLayout({ match }) {
  return (
    <div className={"app app-with-navbar"}>
      <Navbar />
      <div className={"main-container .main-container-as-exercise"}>
        <Route
          exact
          path={match.path}
          render={props => (
            <Exercise lesson={props.match.params.lessonId} {...props} />
          )}
        />
      </div>
    </div>
  );
}

export default ExerciseLayout;
