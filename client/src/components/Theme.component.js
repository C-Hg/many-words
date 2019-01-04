import React from "react";
import { LanguageContext } from "../contexts/language-context";

class Theme extends React.Component {
  render() {
    let language = this.context;
    const lessons = this.props.lessons.map(val => (
      <button onClick={this.props.seeLesson} name={val} key={val}>
        {language.lessons[val]}
      </button>
    ));
    return (
      <div>
        <h1>{language.themes[this.props.theme]}</h1>
        {lessons}
      </div>
    );
  }
}

Theme.contextType = LanguageContext;

export default Theme;
