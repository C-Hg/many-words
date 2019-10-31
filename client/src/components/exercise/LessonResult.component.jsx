import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { LanguageContext } from "../../contexts/language-context";

const mapStateToProps = state => ({ exercise: state.exercise });

const LessonResult = props => {
  const { exercise } = props;
  const errors = exercise.failedWords.length;

  if (!errors) {
    return (
      <LanguageContext.Consumer>
        {({ noMistake }) => <div className="lessonResult">{noMistake}</div>}
      </LanguageContext.Consumer>
    );
  }
  if (errors === 1) {
    return (
      <LanguageContext.Consumer>
        {({ oneMistake, oneMistakeInstruction }) => (
          <div className="lessonResult">
            <div>{oneMistake}</div>
            <div>{oneMistakeInstruction}</div>
          </div>
        )}
      </LanguageContext.Consumer>
    );
  }
  return (
    <LanguageContext.Consumer>
      {({ moreMistakes }) => <div className="lessonResult">{moreMistakes}</div>}
    </LanguageContext.Consumer>
  );
};

LessonResult.propTypes = {
  exercise: {
    failedWords: PropTypes.array.isRequired,
  }.isRequired,
};

export default connect(
  mapStateToProps,
  null
)(LessonResult);
