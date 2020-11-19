import React from "react";

import ContinueButton from "./ContinueButton.component";
import ExitButton from "./ExitButton.component ";
import LessonResult from "./LessonResult.component";
import WordsToRemember from "./WordsToRemember.component";

import VerticalFlexbox from "../../components/div/VerticalFlexbox.styled";

const ExerciseRecap = (props) => {
  const { exercise } = props;
  return (
    <VerticalFlexbox>
      <LessonResult />
      {exercise.failedWords.length > 0 && <WordsToRemember />}
      <VerticalFlexbox>
        <ContinueButton />
        <ExitButton />
      </VerticalFlexbox>
    </VerticalFlexbox>
  );
};

export default ExerciseRecap;
