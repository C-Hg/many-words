import React, { useContext } from "react";

import AzertyKeyboard from "./AzertyKeyboard.component";
import OriginWord from "./OriginWord.component";
import SpecialCharacters from "./SpecialCharacters.component";
import UserTranslation from "./UserTranslation.component";
import Validation from "./Validation.component";
import StyledContainer from "./styled/ExerciseContainer.styled";
import ExerciseTitle from "./styled/ExerciseTitle.styled";

import { LanguageContext } from "../../contexts/language-context";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const mapStateToProps = (state) => ({ exercise: state.exercise });

const ExerciseContainer = (props) => {
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
      <Validation />
      <SpecialCharacters />
      <AzertyKeyboard />
    </StyledContainer>
  );
};

export default ExerciseContainer;
