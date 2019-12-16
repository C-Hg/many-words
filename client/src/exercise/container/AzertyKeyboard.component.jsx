import React from "react";
import CharactersLine from "./styled/CharactersLine.styled";
import useCharacters from "./useCharacters";
import VerticalFlexbox from "../../components/div/VerticalFlexbox.styled";

const line1 = ["a", "z", "e", "r", "t", "y", "u", "i", "o", "p"];
const line2 = ["q", "s", "d", "f", "g", "h", "j", "k", "l", "m"];
const line3 = ["w", "x", "c", "v", "b", "n"];

const AzertyKeyboard = () => {
  const charactersLine1 = useCharacters(line1);
  const charactersLine2 = useCharacters(line2);
  const charactersLine3 = useCharacters(line3);

  return (
    <VerticalFlexbox>
      <CharactersLine>{charactersLine1}</CharactersLine>
      <CharactersLine>{charactersLine2}</CharactersLine>
      <CharactersLine justifyContent="center">{charactersLine3}</CharactersLine>
    </VerticalFlexbox>
  );
};

export default AzertyKeyboard;
