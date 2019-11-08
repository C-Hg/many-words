import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Result from "./Result.component";
import Score from "./Score.component";

const mapStateToProps = state => ({ exercise: state.exercise });

const ExerciseFooter = props => {
  const { exercise } = props;
  const {
    isChecking,
    isAnswerCorrect,
    failedWords,
    wordRank,
    status,
  } = exercise;
  let footerClass = "";

  // only if the exercise is active
  if (isChecking) {
    if (isAnswerCorrect) {
      footerClass = "exercise-footer-correct";
    } else {
      footerClass = "exercise-footer-incorrect";
    }
  }

  // only during recap
  if (status === "recap") {
    const successRatio = (wordRank + 1 - failedWords.length) / (wordRank + 1);
    if (successRatio > 0.8) {
      footerClass = "exercise-footer-correct";
    } else if (successRatio > 0.5) {
      footerClass = "exercise-footer-warning";
    } else {
      footerClass = "exercise-footer-incorrect";
    }
  }

  return (
    <div className={`exercise-footer ${footerClass}`}>
      <div className="footer-content">
        {status === "exercise" && <Result />}
        {status === "recap" && <Score />}
      </div>
    </div>
  );
};

ExerciseFooter.propTypes = {
  exercise: PropTypes.shape({
    status: PropTypes.string.isRequired,
    wordRank: PropTypes.number.isRequired,
    failedWords: PropTypes.array.isRequired,
    isChecking: PropTypes.bool.isRequired,
    isAnswerCorrect: PropTypes.bool.isRequired,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  null
)(ExerciseFooter);
