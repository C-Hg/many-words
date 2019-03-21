import React from "react";

import LessonResult from "./LessonResult.component";
import WordsToRemember from "./WordsToRemember.component";
import ExitLinks from "./ExitLinks.component";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return { exercise: state.exercise };
}

function ExerciseRecap(props) {
  return (
    <div className="exerciseRecap">
      <LessonResult />
      {props.exercise.failedWords.length > 0 && <WordsToRemember />}
      <ExitLinks />
    </div>
  );
}

export default connect(
  mapStateToProps,
  null
)(ExerciseRecap);
