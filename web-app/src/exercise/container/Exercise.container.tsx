import { useQuery } from "@apollo/client";
import React, { useContext } from "react";

import AzertyKeyboard from "./AzertyKeyboard.component";
import OriginWord from "./OriginWord.component";
import SpecialCharacters from "./SpecialCharacters.component";
import UserTranslation from "./UserTranslation.component";
import Validation from "./Validation.component";
import StyledContainer from "./styled/ExerciseContainer.styled";
import ExerciseTitle from "./styled/ExerciseTitle.styled";

import { LANGUAGES } from "../../config/constants";
import { LanguageContext } from "../../contexts/language-context";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { GET_NEXT_EXERCISE } from "../graphql/getNextExercise.graphql";
import { GET_WORD_RANK } from "../graphql/getWordRank.graphql.local";

const ExerciseContainer = () => {
  const language = useContext(LanguageContext);
  const { translateIn, french, english } = language;
  const {
    data: {
      exercise: { words },
    },
  } = useQuery(GET_NEXT_EXERCISE, { fetchPolicy: "cache-only" });
  const {
    data: { wordRank },
  } = useQuery(GET_WORD_RANK);
  const { height: screenHeight } = useWindowDimensions();

  let sourceLanguageIsFr = true;
  if (words[wordRank].language === LANGUAGES.English) {
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
