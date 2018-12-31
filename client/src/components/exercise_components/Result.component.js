import React from "react";
import { LanguageContext } from "../../contexts/language-context";

class Result extends React.Component {
  render() {
    let language = this.context;
    let result = this.props.correctAnswer ? "correct" : "wrong";
    return (
      <div>
        <p>{language[result]}</p>
      </div>
    );
  }
}

Result.contextType = LanguageContext;

export default Result;
