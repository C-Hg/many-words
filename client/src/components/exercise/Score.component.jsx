import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const mapStateToProps = state => ({ exercise: state.exercise });

const Score = props => {
  const { exercise } = props;
  const { wordRank, failedWords } = exercise;
  const totalWords = wordRank + 1;
  const correctAnswers = wordRank + 1 - failedWords.length;
  return (
    <div className="score">
      {correctAnswers} / {totalWords}
    </div>
  );
};

Score.propTypes = {
  exercise: {
    wordRank: PropTypes.number.isRequired,
    failedWords: PropTypes.array.isRequired,
  }.isRequired,
};

export default connect(
  mapStateToProps,
  null
)(Score);
