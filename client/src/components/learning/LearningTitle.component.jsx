import React from "react";
import { LanguageContext } from "../../contexts/language-context";

class LearningTitle extends React.Component {
  render() {
    let language = this.context;
    return (
      <h1 className="learningTitle">
        {language.lessons[this.props.theme][this.props.lesson]}
      </h1>
    );
  }
}

LearningTitle.contextType = LanguageContext;

export default LearningTitle;
