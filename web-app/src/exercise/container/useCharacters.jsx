import React, { useState, useEffect, useCallback } from "react";

import Character from "./styled/Character.styled";

const useCharacters = (charactersLine) => {
  const [characters, setCharacters] = useState([]);
  const isCapitalized = true; // TODO: update with new cache

  const handleLetter = useCallback((event) => {
    // const addLetter = (value) => dispatch({ type: "ADD_LETTER", value });
    const letter = event.target.name;
    // addLetter(letter);
  }, []);

  useEffect(() => {
    const formattedCharacters = charactersLine.map((character) => {
      const name = isCapitalized ? character.toUpperString() : character;
      return (
        <Character
          onClick={handleLetter}
          // onTouchStart={handleTouchStart}
          name={name}
          type="button"
          key={character}
        >
          {character}
        </Character>
      );
    });

    setCharacters(formattedCharacters);
  }, [isCapitalized, charactersLine, handleLetter]);

  return characters;
};

export default useCharacters;
