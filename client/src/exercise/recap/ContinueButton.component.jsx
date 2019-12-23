import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThemeContext } from "styled-components";

import ButtonContainer from "../../components/buttons/ButtonContainer.styled";
import MainButton from "../../components/buttons/MainButton.styled";
import { LanguageContext } from "../../contexts/language-context";
import { types as exerciseTypes } from "../exercise.reducer";

// TODO rename theme / appTheme
const ContinueButton = () => {
  const appTheme = useContext(ThemeContext);
  const language = useContext(LanguageContext);
  const {
    navigation: { toContinue, tryAgain },
  } = language;
  const exercise = useSelector(state => state.exercise);
  const dispatch = useDispatch();

  const continueWeakWords = () =>
    dispatch({ type: exerciseTypes.CONTINUE_WEAK_WORDS });
  const getWords = (lesson, theme) =>
    dispatch({ type: exerciseTypes.GET_WORDS, lesson, theme });

  const { isWeakWordsMode, words } = exercise;
  // gets the lesson and theme of the first word of the current batch
  // this works only for classical lessons
  const { lesson, theme } = words[0];

  const restartLesson = () => {
    if (isWeakWordsMode) {
      continueWeakWords();
    } else {
      getWords(lesson, theme);
    }
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
