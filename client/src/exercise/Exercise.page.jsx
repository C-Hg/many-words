import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ExerciseContainer from "../components/exercise/ExerciseContainer.component";
import ExerciseFooter from "../components/exercise/ExerciseFooter.component";
import ExerciseRecap from "../components/exercise/ExerciseRecap.component";

import "./Exercise.scss";
import AppContainer from "../app/AppContainer.styled";
import ExerciseNavbar from "./Exercise.navbar";
import VerticalFlexbox from "../components/div/VerticalFlexbox.styled";

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
      <AppContainer withNavbar sand>
        <ExerciseNavbar />
        <VerticalFlexbox width="100%" height="100%" sand>
          {status === "exercise" && <ExerciseContainer />}
          {status === "recap" && <ExerciseRecap />}
          <ExerciseFooter />
        </VerticalFlexbox>
      </AppContainer>
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
