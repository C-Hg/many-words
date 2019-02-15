import React from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../contexts/language-context";
import { getLessons } from "../controllers/getLessons.function";
import "./styles/Theme.scss";

class Theme extends React.Component {
  render() {
    let language = this.context;
    let theme = this.props.theme;
    let lessonsData = getLessons(theme);

    const lessons = lessonsData.map(val => (
      <div className="lessonCard" key={val[0]}>
        <h2 className="lessonTitle">{language.lessons[theme][val[0]]}</h2>
        <div className="themeButtons">
          <Link to={`${this.props.match.url}/${val[0]}/test`}>
            <div className="startTest">{language.start_exercise}</div>
          </Link>
          <Link to={`${this.props.match.url}/${val[0]}/learn`}>
            <div className="startLearning">{language.start_learning}</div>
          </Link>
        </div>
      </div>
    ));
    return (
      <div>
        <h1 className="menuTitle">{language.themes[theme]}</h1>
        <div className="lessonCards">{lessons}</div>
      </div>
    );
  }
}

Theme.contextType = LanguageContext;

export default Theme;
