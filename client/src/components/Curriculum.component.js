import React from "react";
import { LanguageContext } from "../contexts/language-context";
import "./styles/Curriculum.scss";

class Curriculum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let language = this.context;
    return (
      <div className="curriculum">
        <h1 className="curriculumTitle">{language.curriculum_title}</h1>
        <Link to="">
          <button onClick={this.props.seeTheme} name="nature">
            Nature
          </button>
        </Link>
      </div>
    );
  }
}

Curriculum.contextType = LanguageContext;

export default Curriculum;
