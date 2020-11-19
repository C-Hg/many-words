import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

import ButtonContainer from "../../components/buttons/ButtonContainer.styled";
import MainButton from "../../components/buttons/MainButton.styled";
import { LanguageContext } from "../../contexts/language-context";
import { types as exerciseTypes } from "../exercise.reducer";

const ExitButton = () => {
  const theme = useContext(ThemeContext);
  const language = useContext(LanguageContext);

  const quitExercise = () => {
    return true;
  };

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
