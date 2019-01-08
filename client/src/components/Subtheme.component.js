import React from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../contexts/language-context";
import { getLessons } from "../controllers/getLessons.function";

class Subtheme extends React.Component {
  render() {
    let language = this.context;
    let subtheme = this.props.subtheme;
    let lessonsData = getLessons(subtheme);
    const lessons = lessonsData.map(val => (
      <div className="lesson" key={val[0]}>
        <p>{language.lessons[val[0]]}</p>
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
        <h1>{language.subthemes[this.props.subtheme]}</h1>
        {lessons}
      </div>
    );
  }
}

Subtheme.contextType = LanguageContext;

export default Subtheme;
