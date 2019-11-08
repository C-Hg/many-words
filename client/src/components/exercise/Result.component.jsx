import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { LanguageContext } from "../../contexts/language-context";

function mapStateToProps(state) {
  return { exercise: state.exercise };
}

function Result(props) {
  const { exercise } = props;
  const { isChecking, isAnswerCorrect, expectedAnswer } = exercise;

  if (isChecking) {
    if (isAnswerCorrect) {
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
        <div className="expectedAnswer">{expectedAnswer}</div>
      </div>
    );
  }
  return null;
}

Result.propTypes = {
  exercise: PropTypes.shape({
    isChecking: PropTypes.bool.isRequired,
    isAnswerCorrect: PropTypes.bool.isRequired,
    expectedAnswer: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  null
)(Result);
