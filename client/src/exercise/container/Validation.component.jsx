import React, { useContext } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ThemeContext } from "styled-components";

import { LanguageContext } from "../../contexts/language-context";
import H3 from "../../components/texts/H3.styled";
import ValidationContainer from "./ValidationContainer.styled";
import ContinueButton from "./ContinueButton.component";
import HorizontalFlexbox from "../../components/div/HorizontalFlexbox.styled";
import { actions as exerciseActions } from "../../redux/reducers/exercise";

const mapStateToProps = state => ({ exercise: state.exercise });
const mapDispatchToProps = dispatch => ({
  submitUserTranslation: () => {
    dispatch(exerciseActions.submitUserTranslation());
  },
  nextWord: () => {
    dispatch(exerciseActions.nextWord());
  },
});

const Validation = props => {
  const { exercise, submitUserTranslation, nextWord } = props;
  const { isChecking, isAnswerCorrect, expectedAnswer } = exercise;
  const language = useContext(LanguageContext);
  const theme = useContext(ThemeContext);
  const { correct } = language;
  const { white, lightGreen, paleRed, sand, darkBlue } = theme.colors;

  const randomCongrats = Math.floor(Math.random() * 17);
  let color;
  if (!isChecking) {
    color = sand;
  } else {
    color = isAnswerCorrect ? lightGreen : paleRed;
  }
  const onClick = isChecking ? nextWord : submitUserTranslation;
  const arrowColor = isChecking ? white : darkBlue;

  return (
    <ValidationContainer backgroundColor={color} isChecking={isChecking}>
      <HorizontalFlexbox backgroundColor={color} justifyContent="flex-start">
        <H3
          textAlign="left"
          fontWeight="400"
          padding="0 0 0 20px"
          margin="15px"
          backgroundColor={color}
          color={white}
        >
          {isAnswerCorrect ? correct[randomCongrats] : `${expectedAnswer}`}
        </H3>
        <ContinueButton onClick={onClick} arrowColor={arrowColor} />
      </HorizontalFlexbox>
    </ValidationContainer>
  );
};

Validation.propTypes = {
  submitUserTranslation: PropTypes.func.isRequired,
  nextWord: PropTypes.func.isRequired,
  exercise: PropTypes.shape({
    isChecking: PropTypes.bool.isRequired,
    isAnswerCorrect: PropTypes.bool.isRequired,
    expectedAnswer: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Validation);
