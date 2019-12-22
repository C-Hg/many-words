import React, { useContext } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ThemeContext } from "styled-components";

import { LanguageContext } from "../../contexts/language-context";
import ValidationContainer from "./styled/ValidationContainer.styled";
import ContinueButton from "./ContinueButton.component";
import HorizontalFlexbox from "../../components/div/HorizontalFlexbox.styled";
import { actions as exerciseActions } from "../exercise.reducer";
import ValidationText from "./styled/ValidationText.styled";
import VerticalFlexbox from "../../components/div/VerticalFlexbox.styled";

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
  // TODO: better management of margin-bottom under validationContainer
  return (
    <ValidationContainer backgroundColor={color} isChecking={isChecking}>
      <HorizontalFlexbox
        height="100%"
        backgroundColor="transparent"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        {isChecking &&
          (isAnswerCorrect ? (
            <ValidationText fontWeight="600" left="40px">
              {correct[randomCongrats]}
            </ValidationText>
          ) : (
            <VerticalFlexbox
              alignSelf="flex-start"
              height="80%"
              backgroundColor="transparent"
              alignItems="flex-start"
              justifyContent="space-evenly"
            >
              <ValidationText fontWeight="600">
                {`${language.correctAnswer} :`}
              </ValidationText>
              <ValidationText
                paddingLeft="10px"
                fontSize="16px"
              >{`${expectedAnswer}`}</ValidationText>
            </VerticalFlexbox>
          ))}
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
