import React from "react";
import { LanguageContext } from "../contexts/language-context";

class Subtheme extends React.Component {
  render() {
    let language = this.context;
    const lessons = this.props.lessons.map(val => (
      <div className="lesson" key={val[0]}>
        <p>{language.lessons[val[0]]}</p>
        <button onClick={this.props.startExercise} name={val[0]}>
          {language.start_exercise}
        </button>
        <button onClick={this.props.startLearning} name={val[0]}>
          {language.start_learning}
        </button>
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
