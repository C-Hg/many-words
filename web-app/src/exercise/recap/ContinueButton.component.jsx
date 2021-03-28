import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

import { exerciseStatusVar } from "../../cache";
import ButtonContainer from "../../components/buttons/ButtonContainer.styled";
import MainButton from "../../components/buttons/MainButton.styled";
import { LanguageContext } from "../../contexts/language-context";
import { GET_EXERCISE_STATUS } from "../graphql/getExerciseStatus.graphql.local";
import { ExerciseStatus } from "../types/ExerciseStatus.enum";

const ContinueButton = () => {
  const {
    data: { exerciseStatus },
  } = useQuery(GET_EXERCISE_STATUS);
  const appTheme = useContext(ThemeContext);
  const language = useContext(LanguageContext);
  const {
    navigation: { toContinue },
  } = language;

  return (
    <ButtonContainer margin="0 0 20px" large>
      <MainButton
        disabled={exerciseStatus === ExerciseStatus.resultSaved}
        type="button"
        onClick={() => exerciseStatusVar(ExerciseStatus.toBegin)}
        color={appTheme.colors.darkBlue}
      >
        {toContinue}
      </MainButton>
    </ButtonContainer>
  );
};

export default ContinueButton;
