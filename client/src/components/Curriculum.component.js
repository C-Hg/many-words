import React from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../contexts/language-context";
import "./styles/Curriculum.scss";

class Curriculum extends React.Component {
  render() {
    let language = this.context;

    return (
      <div className="curriculum">
        <h1 className="curriculumTitle">{language.curriculum.title}</h1>
        <Link to={`../relationships`}>{language.themes.relationships}</Link>
        <Link to={`../nature`}>{language.themes.nature}</Link>
        <Link to={`../education`}>{language.themes.education}</Link>
        <Link to={`../leisure`}>{language.themes.leisure}</Link>
        <Link to={`../health`}>{language.themes.health}</Link>
      </div>
    );
  }
}

Curriculum.contextType = LanguageContext;

export default Curriculum;
