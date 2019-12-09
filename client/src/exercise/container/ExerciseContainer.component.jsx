import React, { useContext } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import OriginWord from "./OriginWord.component";
import UserTranslation from "./UserTranslation.component";
import SpecialCharacters from "../../components/exercise/SpecialCharacters.component";
import { LanguageContext } from "../../contexts/language-context";
import ExerciseTitle from "./ExerciseTitle.styled";
import Validation from "./Validation.component";
import StyledContainer from "../ExerciseContainer.styled";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const mapStateToProps = state => ({ exercise: state.exercise });

const ExerciseContainer = props => {
  const language = useContext(LanguageContext);
  const { translateIn, french, english } = language;
  const { exercise } = props;
  const { words, wordRank } = exercise;
  const { height: screenHeight } = useWindowDimensions();

  let sourceLanguageIsFr = true;
  if (words[wordRank].selectedForm[1] === "en") {
    sourceLanguageIsFr = false;
  }

  return (
    <StyledContainer screenHeight={screenHeight} sand>
      <ExerciseTitle>
        {translateIn} {sourceLanguageIsFr ? english : french}
      </ExerciseTitle>
      <OriginWord />
      <UserTranslation />
      {language.language === "english" && <SpecialCharacters />}
      <Validation />
    </StyledContainer>
  );
};

ExerciseContainer.propTypes = {
  exercise: PropTypes.shape({
    isChecking: PropTypes.bool.isRequired,
    wordRank: PropTypes.number.isRequired,
    words: PropTypes.array.isRequired,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  null
)(ExerciseContainer);
