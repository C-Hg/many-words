import React from "react";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return { exercise: state.exercise };
}

function OriginWord(props) {
  const exercise = props.exercise;
  const word =
    exercise.words[exercise.wordRank][
      exercise.words[exercise.wordRank].selectedForm[1]
    ][0];
  return <div className="originWord">{word}</div>;
}

export default connect(
  mapStateToProps,
  null
)(OriginWord);

/* 
  words is an array of objects, containing
  { fr: [possible FR forms],
    en: [possible EN forms],
    selectedForm: [en_name, source_language, selectedForm],
    theme,
    lesson
  }
*/
