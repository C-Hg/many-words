import { useQuery } from "@apollo/client";
import React, { useContext } from "react";

import OriginWord from "./OriginWord.component";
import SpecialCharacters from "./SpecialCharacters.component";
import UserTranslation from "./UserTranslation.component";
import Validation from "./Validation.component";
import StyledExerciseContainer from "./styled/ExerciseContainer.styled";
import Instructions from "./styled/Instructions.styled";
import LessonTitle from "./styled/LessonTitle.styled";

import { LANGUAGES } from "../../config/constants";
import { LanguageContext } from "../../contexts/language-context";
import { useGetNextExerciseQuery } from "../../graphql/types";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { GET_WORD_RANK } from "../graphql/getWordRank.graphql.local";

// TODO: add the lesson title or "review"
const ExerciseContainer = () => {
  const language = useContext(LanguageContext);
  const { translateIn, french, english } = language;
  const { data } = useGetNextExerciseQuery({ fetchPolicy: "cache-only" });
  const words = data?.exercise?.words;
  const {
    data: { wordRank },
  } = useQuery(GET_WORD_RANK);
  const { height: screenHeight } = useWindowDimensions();

  if (!words) {
    // TODO: loading animation here, not in the hook!
    return null;
  }

  const lesson = words[wordRank].lesson;
  const topic = words[wordRank].topic;
  const isLastWord = wordRank === words.length - 1;
  const sourceLanguage = words?.[wordRank].language;

  return (
    <StyledExerciseContainer screenHeight={screenHeight}>
      <LessonTitle>{language.lessons[topic][lesson]}</LessonTitle>
      <Instructions>
        {translateIn} {sourceLanguage === LANGUAGES.French ? english : french}
      </Instructions>
      <OriginWord
        wordToTranslate={words[wordRank].wordToTranslate}
        language={sourceLanguage as LANGUAGES}
      />
      <UserTranslation
        isLastWord={isLastWord}
        sourceLanguage={sourceLanguage as LANGUAGES}
      />
      <Validation answer={words[wordRank].answers[0]} />
      {sourceLanguage === LANGUAGES.English && <SpecialCharacters />}
      {/* <AzertyKeyboard /> */}
    </StyledExerciseContainer>
  );
};

export default ExerciseContainer;
