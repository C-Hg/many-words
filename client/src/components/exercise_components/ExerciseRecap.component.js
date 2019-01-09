import React from "react";

import LessonResult from "./LessonResult.component";
import WordsToRemember from "./WordsToRemember.component";
import ExitLinks from "./ExitLinks.component";

function ExerciseRecap(props) {
  return (
    <div className="exerciseRecap">
      <LessonResult failedWords={props.failedWords} />
      {props.failedWords.length > 0 && (
        <WordsToRemember failedWords={props.failedWords} />
      )}
      <ExitLinks
        restart={props.restart}
        lesson={props.lesson}
        theme={props.theme}
        subtheme={props.subtheme}
        redirect={props.redirect}
      />
    </div>
  );
}

export default ExerciseRecap;
