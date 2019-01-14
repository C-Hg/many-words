import React from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../contexts/language-context";
import "./styles/Curriculum.scss";

class Curriculum extends React.Component {
  render() {
    let language = this.context;

    return (
      <div className="curriculum">
        <h1 className="curriculumTitle">{language.curriculum_title}</h1>
        <Link to={`../nature`}>Nature</Link>
      </div>
    );
  }
}

Curriculum.contextType = LanguageContext;

export default Curriculum;
