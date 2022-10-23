import React from "react";

// TODO: delete me if not used anymore
const Score = (props) => {
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

export default Score;
