import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { ThemeContext } from "styled-components";

import ButtonContainer from "../../components/buttons/ButtonContainer.styled";
import MainButton from "../../components/buttons/MainButton.styled";
import { LanguageContext } from "../../contexts/language-context";
import { types as exerciseTypes } from "../exercise.reducer";

const ExitButton = () => {
  const theme = useContext(ThemeContext);
  const language = useContext(LanguageContext);
  const dispatch = useDispatch();
  const quitExercise = () => dispatch({ type: exerciseTypes.QUIT_EXERCISE });

  return (
    <ButtonContainer large>
      <MainButton
        type="button"
        onClick={quitExercise}
        color={theme.colors.darkBlue}
      >
        {language.navigation.quit}
      </MainButton>
    </ButtonContainer>
  );
};

export default ExitButton;
