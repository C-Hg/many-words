import React from "react";
import { LanguageContext } from "../../contexts/language-context";

class LessonTitle extends React.Component {
  render() {
    let language = this.context;
    return <h1>{language.lessons[this.props.lesson]}</h1>;
  }
}

LessonTitle.contextType = LanguageContext;

export default LessonTitle;
