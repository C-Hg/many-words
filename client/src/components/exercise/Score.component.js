import React from "react";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return { exercise: state.exercise };
}

function Score(props) {
  const exercise = props.exercise;
  const totalWords = exercise.wordRank + 1;
  const correctAnswers = exercise.wordRank + 1 - exercise.failedWords.length;
  return (
    <div className="score">
      {correctAnswers} / {totalWords}
    </div>
  );
}

export default connect(
  mapStateToProps,
  null
)(Score);
