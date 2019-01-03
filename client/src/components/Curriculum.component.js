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
        <button onClick={this.props.startExercise} name="animals">
          {language.animals_lesson}
        </button>
        <button onClick={this.props.startLearning} name="animals">
          {language.learn}
        </button>
      </div>
    );
  }
}

Curriculum.contextType = LanguageContext;

export default Curriculum;
