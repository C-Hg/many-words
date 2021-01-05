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
import { GET_EXERCISE_DETAILS } from "../graphql/getExerciseDetails.graphql.local";
import { GET_NEXT_EXERCISE } from "../graphql/getNextExercise.graphql";

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
  } = useQuery(GET_EXERCISE_DETAILS);
  const { height: screenHeight } = useWindowDimensions();

  const sourceLanguage = words[wordRank].language;

  if (!words) {
    // TODO: loading animation here, not in the hook!
    return null;
  }

  return (
    <StyledContainer screenHeight={screenHeight} sand>
      <ExerciseTitle>
        {translateIn} {sourceLanguage === LANGUAGES.French ? english : french}
      </ExerciseTitle>
      <OriginWord />
      <UserTranslation sourceLanguage={sourceLanguage} />
      <Validation />
      <SpecialCharacters />
      <AzertyKeyboard />
    </StyledContainer>
  );
};

export default ExerciseContainer;