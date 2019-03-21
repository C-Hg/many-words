import React from "react";
import Result from "./Result.component";
import Score from "./Score.component";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return { exercise: state.exercise };
}

function ExerciseFooter(props) {
  const exercise = props.exercise;

  let footerClass = "";
  //only if the exercise is active
  if (exercise.checking) {
    if (exercise.correctAnswer) {
      footerClass = "exercise-footer-correct";
    } else {
      footerClass = "exercise-footer-incorrect";
    }
  }

  //only during recap
  if (exercise.status === "recap") {
    const successRatio =
      (exercise.wordRank + 1 - exercise.failedWords.length) /
      (exercise.wordRank + 1);
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
      <div className={`footer-content`}>
        {exercise.status === "exercise" && <Result />}
        {exercise.status === "recap" && <Score />}
      </div>
    </div>
  );
}

export default connect(
  mapStateToProps,
  null
)(ExerciseFooter);
