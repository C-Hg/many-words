import React from "react";
import { LanguageContext } from "../../contexts/language-context";

class ExerciseTitle extends React.Component {
  render() {
    let language = this.context;
    if (this.props.status === "recap" && this.props.weak_words_mode) {
      return <h1 className="exerciseTitle">{language.revision}</h1>;
    }
    return (
      <h1 className="exerciseTitle">
        {language.lessons[this.props.theme][this.props.lesson]}
      </h1>
    );
  }
}

ExerciseTitle.contextType = LanguageContext;

export default ExerciseTitle;
