import React from "react";
import { LanguageContext } from "../contexts/language-context";

class Curriculum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let language = this.context;
    return (
      <div>
        <h1>{language.curriculum_title}</h1>
        <button onClick={this.props.seeTheme} name="nature">
          Nature
        </button>
      </div>
    );
  }
}

Curriculum.contextType = LanguageContext;

export default Curriculum;
