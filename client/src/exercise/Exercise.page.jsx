import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Close from "../components/exercise/Close.component";
import ExerciseContainer from "../components/exercise/ExerciseContainer.component";
import ExerciseFooter from "../components/exercise/ExerciseFooter.component";
import ExerciseRecap from "../components/exercise/ExerciseRecap.component";

import "./Exercise.scss";
import Container from "../app/Container.styled";
import ExerciseNavbar from "./Exercise.navbar";

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
      <Container withNavbar>
        <ExerciseNavbar />
        <div className="exercise">
          <div className="titleAndCross">
            <Close />
          </div>
          {status === "exercise" && <ExerciseContainer />}
          {status === "recap" && <ExerciseRecap />}
          <ExerciseFooter />
        </div>
      </Container>
    );
  }
  // TODO: implement waiting animation
  return null;
};

Exercise.propTypes = {
  exercise: PropTypes.shape({
    redirect: PropTypes.bool.isRequired,
    redirectionTarget: PropTypes.string.isRequired,
    words: PropTypes.array,
    status: PropTypes.string.isRequired,
  }),
};

Exercise.defaultProps = {
  exercise: {
    words: [],
  },
};

export default connect(
  mapStateToProps,
  null
)(Exercise);
