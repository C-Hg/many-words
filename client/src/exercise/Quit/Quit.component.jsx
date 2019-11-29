import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Close } from "styled-icons/evil";

import { actions as exerciseActions } from "../../redux/reducers/exercise";
import StyledClose from "./Close.styled";

const mapStateToProps = state => ({ exercise: state.exercise });

const mapDispatchToProps = dispatch => ({
  quitExercise: () => {
    dispatch(exerciseActions.quitExercise());
  },
});

const Quit = props => {
  const { quitExercise } = props;

  return (
    <StyledClose onClick={quitExercise} className="QuitButton" type="button">
      <Close alt="Quit" size="40" />
    </StyledClose>
  );
};

Quit.propTypes = {
  quitExercise: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quit);
