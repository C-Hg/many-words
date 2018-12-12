import React from "react";

const Result = function(props) {
  let result = props.correctAnswer ? "correct answer" : "wrong answer";
  return (
    <div>
      <p>{result}</p>
    </div>
  );
};

export default Result;
