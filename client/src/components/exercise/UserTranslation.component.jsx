import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { actions as exerciseActions } from "../../redux/reducers/exercise";
import CONSTANTS from "../../config/constants";

const mapStateToProps = state => ({ exercise: state.exercise });

const mapDispatchToProps = dispatch => ({
  submitUserTranslation: () => {
    dispatch(exerciseActions.submitUserTranslation());
  },
  updateUserTranslation: value => {
    dispatch(exerciseActions.updateUserTranslation(value));
  },
  nextWord: () => {
    dispatch(exerciseActions.nextWord());
  },
});

const UserTranslation = props => {
  const translationInput = useRef();

  const {
    exercise,
    nextWord,
    submitUserTranslation,
    updateUserTranslation,
  } = props;
  const { userTranslation, isAnswerCorrect } = exercise;

  // this makes the focus facultative to answer
  const handleKeyDown = event => {
    event.preventDefault();
    // Enter key
    if (event.key === "Enter") {
      if (exercise.isChecking) {
        nextWord();
      } else {
        submitUserTranslation();
      }
    } else if (!exercise.isChecking) {
      // White space
      if (/\s/.test(event.key)) {
        updateUserTranslation(`${userTranslation} `);
      }
      // Backspace
      else if (event.key === "Backspace" && userTranslation.length > 0) {
        updateUserTranslation(userTranslation.slice(0, -1));
      }
      // all allowed letters
      else if (CONSTANTS.allowedCharacters.test(event.key)) {
        updateUserTranslation(userTranslation + event.key);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const userTranslationChange = event => {
    // special characters are not allowed for security reasons
    const specialCharacters = /[.?/\\_+,;:!*()[\]{}~&%$]+/i;
    const isCharacterAllowed = !specialCharacters.test(event.target.value);
    if (isCharacterAllowed) {
      updateUserTranslation(event.target.value);
    }
  };

  let inputStatus;
  let readOnly = false;
  if (exercise.isChecking) {
    readOnly = true;
    if (isAnswerCorrect) {
      inputStatus = "input-correct";
    } else {
      inputStatus = "input-wrong";
    }
  } else {
    inputStatus = "input-active";
  }
  return (
    <input
      type="text"
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      className={`userInput ${inputStatus}`}
      value={userTranslation}
      onChange={userTranslationChange}
      ref={translationInput}
      readOnly={readOnly}
    />
  );
};

UserTranslation.propTypes = {
  exercise: PropTypes.shape({
    isChecking: PropTypes.bool.isRequired,
    isAnswerCorrect: PropTypes.bool.isRequired,
    userTranslation: PropTypes.string.isRequired,
  }).isRequired,
  nextWord: PropTypes.func.isRequired,
  submitUserTranslation: PropTypes.func.isRequired,
  updateUserTranslation: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserTranslation);
