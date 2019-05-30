import React from "react";
import { LanguageContext } from "../../contexts/language-context";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return { exercise: state.exercise };
}

function Instructions(props) {
  let sourceLanguageIsFr = true;
  const exercise = props.exercise;
  if (exercise.words[exercise.wordRank].selectedForm[1] === "en") {
    sourceLanguageIsFr = false;
  }
  return (
    <LanguageContext.Consumer>
      {({ translate_in, french, english }) => (
        <div className="instructions">
          {translate_in} {sourceLanguageIsFr ? english : french}
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default connect(
  mapStateToProps,
  null
)(Instructions);
