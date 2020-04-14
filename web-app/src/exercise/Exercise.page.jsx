import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import AppContainer from "../app/AppContainer.styled";
import ExerciseNavbar from "./Exercise.navbar";
import VerticalFlexbox from "../components/div/VerticalFlexbox.styled";
import ExerciseContainer from "./container/Exercise.container";
import ExerciseRecap from "./recap/ExerciseRecap.container";

const mapStateToProps = state => {
  return { user: state.user, exercise: state.exercise };
};

const Exercise = props => {
  const { exercise } = props;
  const { redirect, redirectionTarget, words, status } = exercise;

  // TODO: use links instead of Redirect
  if (redirect) {
    return <Redirect to={redirectionTarget} />;
  }
  if (words) {
    return (
      <AppContainer withNavbar sand>
        <ExerciseNavbar />
        <VerticalFlexbox
          width="100%"
          height="100%"
          justifyContent="flex-start"
          sand
        >
          {status === "exercise" && <ExerciseContainer />}
          {status === "recap" && <ExerciseRecap />}
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
