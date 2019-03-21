import React from "react";
import { LanguageContext } from "../../contexts/language-context";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return { exercise: state.exercise };
}

function Result(props) {
  const exercise = props.exercise;

  if (exercise.checking) {
    if (exercise.correctAnswer) {
      let randomResponse = Math.floor(Math.random() * 17);
      return (
        <LanguageContext.Consumer>
          {({ correct }) => (
            <div className="result">{correct[randomResponse]}</div>
          )}
        </LanguageContext.Consumer>
      );
    } else {
      return (
        <div className="result">
          <div className="expectedAnswer">{exercise.expectedAnswer}</div>
        </div>
      );
    }
  } else return null;
}

export default connect(
  mapStateToProps,
  null
)(Result);
