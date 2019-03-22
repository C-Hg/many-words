import React from "react";
import { Redirect } from "react-router-dom";
import Close from "../components/exercise/Close.component";
import ExerciseTitle from "../components/exercise/ExerciseTitle.component";
import ExerciseContainer from "../components/exercise/ExerciseContainer.component";
import ExerciseFooter from "../components/exercise/ExerciseFooter.component";
import ExerciseRecap from "../components/exercise/ExerciseRecap.component";
import { connect } from "react-redux";

import "../styles/Exercise.scss";

function mapStateToProps(state) {
  return { user: state.user, exercise: state.exercise };
}

function Exercise(props) {
  const exercise = this.props.exercise;

  if (exercise.redirect) {
    return <Redirect to={exercise.redirectionTarget} />;
  }
  if (exercise.words) {
    return (
      <div className="app">
        <div className="main-container">
          <div className="exercise whiteBackground">
            <div className="titleAndCross">
              <Close />
              <ExerciseTitle />
            </div>
            {exercise.status === "exercise" && <ExerciseContainer />}
            {exercise.status === "recap" && <ExerciseRecap />}
            <ExerciseFooter />
          </div>
        </div>
      </div>
    );
  } else {
    //TO DO : implement waiting animation
    return null;
  }
}

export default connect(
  mapStateToProps,
  null
)(Exercise);
