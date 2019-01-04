import React from "react";
import { LanguageContext } from "../contexts/language-context";

class seeLesson extends React.Component {
  render() {
    let language = this.context;
    const subLessons = this.props.subLessons.map(val => (
      <div className="subLesson" key={val[0]}>
        <p>{language.subLessons[val[0]]}</p>
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
        <h1>{language.lessons[this.props.lesson]}</h1>
        {subLessons}
      </div>
    );
  }
}

seeLesson.contextType = LanguageContext;

export default seeLesson;
