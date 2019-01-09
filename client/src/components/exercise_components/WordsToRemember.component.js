import React from "react";

const WordsToRemember = function(props) {
  let words = props.failedWords.map(val => {
    return (
      <div key={`${val[0]}`}>
        {val[0]} : {val[1]}
      </div>
    );
  });
  return <div className="missedWords">{words}</div>;
};

export default WordsToRemember;
