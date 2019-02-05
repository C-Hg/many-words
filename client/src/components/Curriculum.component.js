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
        <Link to={`../animals`}>{language.themes.animals}</Link>
        <Link to={`../clothes`}>{language.themes.clothes}</Link>
        <Link to={`../colors`}>{language.themes.colors}</Link>
        <Link to={`../food`}>{language.themes.food}</Link>
        <Link to={`../habitation`}>{language.themes.habitation}</Link>
        <Link to={`../human_body`}>{language.themes.human_body}</Link>
        <Link to={`../nature`}>{language.themes.nature}</Link>
        <Link to={`../numbers`}>{language.themes.numbers}</Link>
        <Link to={`../social_life`}>{language.themes.social_life}</Link>
        <Link to={`../time`}>{language.themes.time}</Link>
        <Link to={`../vegetals`}>{language.themes.vegetals}</Link>
      </div>
    );
  }
}

Curriculum.contextType = LanguageContext;

export default Curriculum;
