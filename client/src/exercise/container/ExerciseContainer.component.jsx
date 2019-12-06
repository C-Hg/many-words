import React, { useContext } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import OriginWord from "./OriginWord.component";
import UserTranslation from "./UserTranslation.component";
import SpecialCharacters from "../../components/exercise/SpecialCharacters.component";
import { LanguageContext } from "../../contexts/language-context";
import VerticalFlexbox from "../../components/div/VerticalFlexbox.styled";
import ExerciseTitle from "./ExerciseTitle.styled";
import ContinueButton from "./ContinueButton.component";
import Validation from "./Validation.component";

const mapStateToProps = state => ({ exercise: state.exercise });

const ExerciseContainer = props => {
  const language = useContext(LanguageContext);
  const { translateIn, french, english } = language;
  const { exercise } = props;
  const { words, wordRank, isChecking } = exercise;

  let sourceLanguageIsFr = true;
  if (words[wordRank].selectedForm[1] === "en") {
    sourceLanguageIsFr = false;
  }

  return (
    <VerticalFlexbox
      alignSelf="flex-start"
      padding="0"
      margin="0 auto 0 auto"
      width="100%"
      sand
    >
      <ExerciseTitle>
        {translateIn} {sourceLanguageIsFr ? english : french}
      </ExerciseTitle>
      <OriginWord />
      <UserTranslation />
      {language.language === "english" && <SpecialCharacters />}
      <ContinueButton />
      {isChecking && <Validation />}
    </VerticalFlexbox>
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
