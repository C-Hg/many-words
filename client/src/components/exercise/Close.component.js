import React from "react";
import { actions as exerciseActions } from "../../redux/reducers/exercise";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return { exercise: state.exercise };
}

const mapDispatchToProps = dispatch => {
  return {
    quitExercise: () => {
      dispatch(exerciseActions.quitExercise());
    }
  };
};

const Close = function(props) {
  return (
    <button onClick={props.quitExercise} className="closeButton">
      <i alt="Close" className="material-icons md-72 close">
        close
      </i>
    </button>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Close);
