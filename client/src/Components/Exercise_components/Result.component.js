import React from "react";

const Result = function(props) {
  let correct = "2";
  if (props.correct) {
    correct = 1;
  }

  return (
    <div>
      <p>result : {correct}</p>
      <p>mot numéro : {props.word}</p>
    </div>
  );
};

export default Result;
