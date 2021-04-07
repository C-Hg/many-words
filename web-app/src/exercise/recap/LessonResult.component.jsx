import React, { useContext } from "react";

import H2 from "../../components/texts/H2.styled";
import { LanguageContext } from "../../contexts/language-context";

const LessonResult = (props) => {
  const errors = props.failedWords.length;
  const language = useContext(LanguageContext);
  const {
    noMistake,
    oneMistake,
    oneMistakeInstruction,
    moreMistakes,
  } = language;

  let content;
  if (!errors) {
    content = noMistake;
  } else if (errors === 1) {
    content = (
      <>
        <div>{oneMistake}</div>
        <div>{oneMistakeInstruction}</div>
      </>
    );
  } else {
    content = moreMistakes;
  }

  return (
    <H2 fontSize="22px" padding="6px" margin="5px 0 20px">
      {content}
    </H2>
  );
};

export default LessonResult;
