import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Close from "../components/exercise/Close.component";
import ExerciseTitle from "../components/exercise/ExerciseTitle.component";
import ExerciseContainer from "../components/exercise/ExerciseContainer.component";
import ExerciseFooter from "../components/exercise/ExerciseFooter.component";
import ExerciseRecap from "../components/exercise/ExerciseRecap.component";

import "./Exercise.scss";

const mapStateToProps = state => {
  return { user: state.user, exercise: state.exercise };
};

const Exercise = props => {
  const { exercise } = props;
  const { redirect, redirectionTarget, words, status } = exercise;

  if (redirect) {
    return <Redirect to={redirectionTarget} />;
  }
  if (words) {
    return (
      <div className="app">
        <div className="main-container whiteBackground">
          <div className="exercise">
            <div className="titleAndCross">
              <Close />
              <ExerciseTitle />
            </div>
            {status === "exercise" && <ExerciseContainer />}
            {status === "recap" && <ExerciseRecap />}
            <ExerciseFooter />
          </div>
        </div>
      </div>
    );
  }
  // TODO: implement waiting animation
  return null;
};

Exercise.propTypes = {
  exercise: {
    redirect: PropTypes.bool.isRequired,
    redirectionTarget: PropTypes.string.isRequired,
    words: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired,
  }.isRequired,
};

export default connect(
  mapStateToProps,
  null
)(Exercise);
