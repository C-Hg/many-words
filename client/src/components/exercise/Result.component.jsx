import React from "react";
import { connect } from "react-redux";
import { LanguageContext } from "../../contexts/language-context";

function mapStateToProps(state) {
  return { exercise: state.exercise };
}

function Result(props) {
  const { exercise } = props;

  if (exercise.checking) {
    if (exercise.isAnswerCorrect) {
      const randomResponse = Math.floor(Math.random() * 17);
      return (
        <LanguageContext.Consumer>
          {({ correct }) => (
            <div className="result">{correct[randomResponse]}</div>
          )}
        </LanguageContext.Consumer>
      );
    }
    return (
      <div className="result">
        <div className="expectedAnswer">{exercise.expectedAnswer}</div>
      </div>
    );
  }
  return null;
}

export default connect(
  mapStateToProps,
  null
)(Result);
