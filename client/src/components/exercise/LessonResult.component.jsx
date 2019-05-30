import React from "react";
import { LanguageContext } from "../../contexts/language-context";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return { exercise: state.exercise };
}

function LessonResult(props) {
  const errors = props.exercise.failedWords.length;
  if (!errors) {
    return (
      <LanguageContext.Consumer>
        {({ no_mistake }) => <div className="lessonResult">{no_mistake}</div>}
      </LanguageContext.Consumer>
    );
  }
  if (errors === 1) {
    return (
      <LanguageContext.Consumer>
        {({ one_mistake, one_mistake_instructions }) => (
          <div className="lessonResult">
            <div>{one_mistake}</div>
            <div>{one_mistake_instructions}</div>
          </div>
        )}
      </LanguageContext.Consumer>
    );
  } else {
    return (
      <LanguageContext.Consumer>
        {({ more_mistakes }) => (
          <div className="lessonResult">{more_mistakes}</div>
        )}
      </LanguageContext.Consumer>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(LessonResult);
