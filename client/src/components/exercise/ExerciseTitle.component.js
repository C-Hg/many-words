import React from "react";
import { LanguageContext } from "../../contexts/language-context";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return { exercise: state.exercise };
}

class ExerciseTitle extends React.Component {
  render() {
    const language = this.context;
    const exercise = this.props.exercise;
    const lesson = exercise.words[exercise.wordRank].lesson;
    const theme = exercise.words[exercise.wordRank].theme;

    if (exercise.status === "recap" && exercise.weakWordsMode) {
      return <h1 className="exerciseTitle">{language.revision}</h1>;
    }
    return <h1 className="exerciseTitle">{language.lessons[theme][lesson]}</h1>;
  }
}

ExerciseTitle.contextType = LanguageContext;

export default connect(
  mapStateToProps,
  null
)(ExerciseTitle);
