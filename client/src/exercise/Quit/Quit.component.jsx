import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Close } from "styled-icons/evil";

import { actions as exerciseActions } from "../../redux/reducers/exercise";
import IconButton from "../../components/buttons/IconButton.styled";

const mapStateToProps = state => ({ exercise: state.exercise });

const mapDispatchToProps = dispatch => ({
  quitExercise: () => {
    dispatch(exerciseActions.quitExercise());
  },
});

const Quit = props => {
  const { quitExercise } = props;

  return (
    <IconButton
      onClick={quitExercise}
      left="20px"
      className="QuitButton"
      type="button"
    >
      <Close alt="Quit" size="40" />
    </IconButton>
  );
};

Quit.propTypes = {
  quitExercise: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quit);
