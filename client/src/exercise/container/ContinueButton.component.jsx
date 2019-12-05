import React, { useContext } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ThemeContext } from "styled-components";

import { LanguageContext } from "../../contexts/language-context";
import { actions as exerciseActions } from "../../redux/reducers/exercise";
import ButtonContainer from "../../components/buttons/ButtonContainer.styled";
import MainButton from "../../components/buttons/MainButton.styled";

const mapStateToProps = state => ({ exercise: state.exercise });

const mapDispatchToProps = dispatch => ({
  nextWord: () => {
    dispatch(exerciseActions.nextWord());
  },
  submitUserTranslation: () => {
    dispatch(exerciseActions.submitUserTranslation());
  },
});

const ContinueButton = props => {
  const language = useContext(LanguageContext);
  const theme = useContext(ThemeContext);
  const { exercise, nextWord, submitUserTranslation } = props;
  const { isChecking } = exercise;

  return (
    <ButtonContainer alignSelf="flex-end" margin="20px auto 0 auto" mid>
      <MainButton
        onClick={isChecking ? nextWord : submitUserTranslation}
        color={theme.colors.darkBlue}
        type="button"
        fast
      >
        {isChecking ? language.next_button : language.check_button}
      </MainButton>
    </ButtonContainer>
  );
};

ContinueButton.propTypes = {
  exercise: PropTypes.shape({
    userTranslation: PropTypes.string.isRequired,
    isChecking: PropTypes.bool.isRequired,
    isAnswerCorrect: PropTypes.bool.isRequired,
  }).isRequired,
  nextWord: PropTypes.func.isRequired,
  submitUserTranslation: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContinueButton);
