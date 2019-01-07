import React from "react";
import { LanguageContext } from "../../contexts/language-context";

class ExerciseTitle extends React.Component {
  render() {
    let language = this.context;
    return (
      <h1 className="exerciseTitle">{language.lessons[this.props.lesson]}</h1>
    );
  }
}

ExerciseTitle.contextType = LanguageContext;

export default ExerciseTitle;
