import React from "react";
import { LanguageContext } from "../../contexts/language-context";

class LessonTitle extends React.Component {
  render() {
    let language = this.context;

    return (
      <h2 className="lessonTitle">
        {language.lessons[this.props.theme][this.props.lesson]}
      </h2>
    );
  }
}

export default LessonTitle;

LessonTitle.contextType = LanguageContext;
