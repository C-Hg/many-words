import React, { useContext } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import OriginWord from "./OriginWord.component";
import UserTranslation from "./UserTranslation.component";
import SubmitOrNextButton from "./SubmitOrNextButton.component";
import SpecialCharacters from "./SpecialCharacters.component";
import { LanguageContext } from "../../contexts/language-context";
import H2 from "../texts/H2.styled";
import VerticalFlexbox from "../div/VerticalFlexbox.styled";

const mapStateToProps = state => ({ exercise: state.exercise });

const ExerciseContainer = props => {
  const language = useContext(LanguageContext);
  const { translateIn, french, english } = language;
  const { exercise } = props;
  const { words, wordRank } = exercise;

  let sourceLanguageIsFr = true;
  if (words[wordRank].selectedForm[1] === "en") {
    sourceLanguageIsFr = false;
  }

  return (
    <VerticalFlexbox sand width="450px">
      <H2
        textAlign="left"
        alignSelf="flex-start"
        margin="0 0 50px"
        fontSize="26px"
      >
        {translateIn} {sourceLanguageIsFr ? english : french}
      </H2>
      <OriginWord />
      <UserTranslation />
      {language.language === "english" && <SpecialCharacters />}
      <SubmitOrNextButton />
    </VerticalFlexbox>
  );
};

ExerciseContainer.propTypes = {
  exercise: PropTypes.shape({
    wordRank: PropTypes.number.isRequired,
    words: PropTypes.array.isRequired,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  null
)(ExerciseContainer);
