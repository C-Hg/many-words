import React from "react";
import { LanguageContext } from "../../contexts/language-context";

const Result = function(props) {
  if (props.checking) {
    if (props.correctAnswer) {
      let randomResponse = Math.floor(Math.random() * 17);
      return (
        <LanguageContext.Consumer>
          {({ correct }) => (
            <div className="result">{correct[randomResponse]}</div>
          )}
        </LanguageContext.Consumer>
      );
    } else {
      return (
        <div className="result">
          <i className="material-icons md-48">arrow_forward</i>
          <div className="expectedAnswer">{props.expectedAnswer}</div>
        </div>
      );
    }
  } else return null;
};

export default Result;
