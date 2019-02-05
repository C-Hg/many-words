import React from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../contexts/language-context";
import { getLessons } from "../controllers/getLessons.function";

class Theme extends React.Component {
  render() {
    let language = this.context;
    let theme = this.props.theme;
    let lessonsData = getLessons(theme);
    const lessons = lessonsData.map(val => (
      <div className="lesson" key={val[0]}>
        <p>{language.lessons[theme][val[0]]}</p>
        <Link to={`${this.props.match.url}/${val[0]}/test`}>
          {language.start_exercise}
        </Link>
        <Link to={`${this.props.match.url}/${val[0]}/learn`}>
          {language.start_learning}
        </Link>
      </div>
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
