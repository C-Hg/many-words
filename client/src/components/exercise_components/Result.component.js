import React from "react";
import { LanguageContext } from "../../contexts/language-context";

const Result = function(props) {
  if (props.checking) {
    if (props.correctAnswer) {
      let randomResponse = Math.floor(Math.random() * 7);
      return (
        <LanguageContext.Consumer>
          {({ correct }) => (
            <div className="result">{correct[randomResponse]}</div>
          )}
        </LanguageContext.Consumer>
      );
    } else {
      return (
        <LanguageContext.Consumer>
          {({ wrong }) => <div className="result">{wrong}</div>}
        </LanguageContext.Consumer>
      );
    }
  } else return null;
};

export default Result;
