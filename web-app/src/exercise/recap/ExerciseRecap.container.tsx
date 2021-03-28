import { useQuery } from "@apollo/client";
import React from "react";

import ContinueButton from "./ContinueButton.component";
import LessonResult from "./LessonResult.component";
import WordsToRemember from "./WordsToRemember.component";

import VerticalFlexbox from "../../components/div/VerticalFlexbox.styled";
import { GET_FAILED_WORDS } from "../graphql/getFailedWords.graphql.local";

const ExerciseRecap = () => {
  const {
    data: { failedWords },
  } = useQuery(GET_FAILED_WORDS);

  return (
    <VerticalFlexbox>
      <LessonResult failedWords={failedWords} />
      {failedWords.length > 0 && <WordsToRemember />}
      <ContinueButton />
    </VerticalFlexbox>
  );
};

export default ExerciseRecap;
