import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

import CharactersLine from "./styled/CharactersLine.styled";
import useCharacters from "./useCharacters";

import ButtonContainer from "../../components/buttons/ButtonContainer.styled";
import MainButton from "../../components/buttons/MainButton.styled";
import VerticalFlexbox from "../../components/div/VerticalFlexbox.styled";
import { toggleSpecialCharacters } from "../Exercise.controller";
import { GET_EXERCISE_DETAILS } from "../graphql/getExerciseDetails.graphql.local";

const line1 = ["à", "â", "æ", "œ", "ç"];
const line2 = ["é", "è", "ê", "ë", "î", "ï", "ô", "ù", "û", "ü"];

const SpecialCharacters = () => {
  const theme = useContext(ThemeContext);
  const {
    data: { areSpecialCharactersVisible },
  } = useQuery(GET_EXERCISE_DETAILS);

  const charactersLine1 = useCharacters(line1);
  const charactersLine2 = useCharacters(line2);

  const isVisible = areSpecialCharactersVisible;
  // the element is rendered only for english speakers when translating to French
  // space is reserved for better visual experience

  if (isVisible) {
    return (
      <VerticalFlexbox>
        <CharactersLine justifyContent="center">
          {charactersLine1}
        </CharactersLine>
        <CharactersLine>{charactersLine2}</CharactersLine>
      </VerticalFlexbox>
    );
  }

  return (
    <ButtonContainer mid>
      <MainButton
        color={theme.colors.grey}
        onClick={toggleSpecialCharacters}
        type="button"
      >
        Accents
      </MainButton>
    </ButtonContainer>
  );
};

export default SpecialCharacters;
