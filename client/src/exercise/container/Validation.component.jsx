import React, { useContext } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ThemeContext } from "styled-components";

import { LanguageContext } from "../../contexts/language-context";
import H3 from "../../components/texts/H3.styled";
import ValidationContainer from "./ValidationContainer.styled";

const mapStateToProps = state => ({ exercise: state.exercise });

const Validation = props => {
  const { exercise } = props;
  const { isChecking, isAnswerCorrect, expectedAnswer } = exercise;
  const language = useContext(LanguageContext);
  const theme = useContext(ThemeContext);
  const { correct } = language;

  const randomCongrats = Math.floor(Math.random() * 17);
  const color = isAnswerCorrect ? theme.colors.green : theme.colors.red;
  //   const icon = isAnswerCorrect ?

  return (
    <ValidationContainer backgroundColor={color}>
      {isChecking && (
        <H3
          textAlign="left"
          fontWeight="400"
          margin="15px"
          backgroundColor={color}
          color={theme.colors.white}
        >
          {isAnswerCorrect ? correct[randomCongrats] : `${expectedAnswer}`}
        </H3>
      )}
    </ValidationContainer>
  );
};

Validation.propTypes = {
  exercise: PropTypes.shape({
    isChecking: PropTypes.bool.isRequired,
    isAnswerCorrect: PropTypes.bool.isRequired,
    expectedAnswer: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  null
)(Validation);
