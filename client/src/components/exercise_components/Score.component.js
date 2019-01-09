import React from "react";

function Score(props) {
  let totalWords = props.wordRank + 1;
  let correctAnswers = props.wordRank + 1 - props.failedWords.length;
  return (
    <div className="score">
      {correctAnswers} / {totalWords}
    </div>
  );
}

export default Score;
