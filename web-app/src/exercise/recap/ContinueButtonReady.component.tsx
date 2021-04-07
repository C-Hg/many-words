import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

import ButtonContainer from "../../components/buttons/ButtonContainer.styled";
import MainButton from "../../components/buttons/MainButton.styled";
import { LanguageContext } from "../../contexts/language-context";
import { goToNextExercise } from "../Exercise.controller";

const ContinueButtonReady = () => {
  const appTheme = useContext(ThemeContext);
  const language = useContext(LanguageContext);
  const {
    navigation: { toContinue },
  } = language;

  return (
    <ButtonContainer margin="0 0 20px" large>
      <MainButton
        type="button"
        onClick={goToNextExercise}
        color={appTheme.colors.darkBlue}
      >
        {toContinue}
      </MainButton>
    </ButtonContainer>
  );
};

export default ContinueButtonReady;
