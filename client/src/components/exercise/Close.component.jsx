import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { actions as exerciseActions } from "../../redux/reducers/exercise";

const mapStateToProps = state => ({ exercise: state.exercise });

const mapDispatchToProps = dispatch => ({
  quitExercise: () => {
    dispatch(exerciseActions.quitExercise());
  },
});

const Close = props => {
  const { quitExercise } = props;

  return (
    <button onClick={quitExercise} className="closeButton" type="button">
      <i alt="Close" className="material-icons md-72 close">
        close
      </i>
    </button>
  );
};

Close.propTypes = {
  quitExercise: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Close);
