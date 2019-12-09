import React, { useContext } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ThemeContext } from "styled-components";

import { ArrowRight } from "styled-icons/evil";
import { LanguageContext } from "../../contexts/language-context";
import H3 from "../../components/texts/H3.styled";
import ValidationContainer from "./ValidationContainer.styled";
import ContinueButton from "./ContinueButton.component";
import HorizontalFlexbox from "../../components/div/HorizontalFlexbox.styled";
import Container from "../../components/div/Container.styled";

const mapStateToProps = state => ({ exercise: state.exercise });

const iconSize = "60";

const Validation = props => {
  const { exercise } = props;
  const { isChecking, isAnswerCorrect, expectedAnswer } = exercise;
  const language = useContext(LanguageContext);
  const theme = useContext(ThemeContext);
  const { correct } = language;
  const { white, lightGreen, paleRed } = theme.colors;

  const randomCongrats = Math.floor(Math.random() * 17);
  const color = isAnswerCorrect ? lightGreen : paleRed;

  return (
    <ValidationContainer backgroundColor={color} isChecking={isChecking}>
      {!isChecking && <ContinueButton />}
      {isChecking && (
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
          <Container
            backgroundColor={color}
            margin="0 0 0 auto"
            width="auto"
            padding="0 20px 0 0"
          >
            <ArrowRight size={iconSize} color={white} margin="0 0 0 auto" />
          </Container>
        </HorizontalFlexbox>
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
