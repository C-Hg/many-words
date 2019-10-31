import React, { useContext } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { LanguageContext } from "../../contexts/language-context";
import { actions as exerciseActions } from "../../redux/reducers/exercise";

const mapStateToProps = state => ({ exercise: state.exercise });

const mapDispatchToProps = dispatch => ({
  nextWord: () => {
    dispatch(exerciseActions.nextWord());
  },
  submitUserTranslation: () => {
    dispatch(exerciseActions.submitUserTranslation());
  },
});

const SubmitOrNextButton = props => {
  const language = useContext(LanguageContext);
  let buttonClass = "";
  const { exercise, nextWord, submitUserTranslation } = props;
  const { userTranslation, isChecking, isAnswerCorrect } = exercise;

  // TODO: use classnames
  if (userTranslation === "") {
    buttonClass = "button-inactivable";
  } else {
    buttonClass = "button-activable";
  }
  if (isChecking) {
    if (isAnswerCorrect) {
      buttonClass = "button-correct";
    } else {
      buttonClass = "button-wrong";
    }
  }

  return (
    <button
      className={`exercise-button ${buttonClass}`}
      onClick={isChecking ? nextWord : submitUserTranslation}
      type="button"
    >
      {isChecking ? language.next_button : language.check_button}
    </button>
  );
};

SubmitOrNextButton.propTypes = {
  exercise: {
    userTranslation: PropTypes.string.isRequired,
    isChecking: PropTypes.bool.isRequired,
    isAnswerCorrect: PropTypes.bool.isRequired,
  }.isRequired,
  nextWord: PropTypes.func.isRequired,
  submitUserTranslation: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitOrNextButton);
