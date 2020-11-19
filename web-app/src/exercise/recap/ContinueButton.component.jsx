import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

import ButtonContainer from "../../components/buttons/ButtonContainer.styled";
import MainButton from "../../components/buttons/MainButton.styled";
import { LanguageContext } from "../../contexts/language-context";

// TODO rename theme / appTheme
const ContinueButton = () => {
  const appTheme = useContext(ThemeContext);
  const language = useContext(LanguageContext);
  const {
    navigation: { toContinue, tryAgain },
  } = language;

  const isWeakWordsMode = true;

  const words = [];
  // gets the lesson and theme of the first word of the current batch
  // this works only for classical lessons
  const { lesson, theme } = words[0];

  const restartLesson = () => {
    // if (isWeakWordsMode) {
    //   continueWeakWords();
    // } else {
    //   getWords(lesson, theme);
    // }
  };

  return (
    <ButtonContainer margin="0 0 20px" large>
      <MainButton
        type="button"
        onClick={restartLesson}
        color={appTheme.colors.darkBlue}
      >
        {isWeakWordsMode ? toContinue : tryAgain}
      </MainButton>
    </ButtonContainer>
  );
};

export default ContinueButton;
