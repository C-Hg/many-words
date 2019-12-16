import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions as exerciseActions } from "../exercise.reducer";
import Character from "./styled/Character.styled";

const useCharacters = charactersLine => {
  const [characters, setCharacters] = useState([]);
  const exercise = useSelector(state => state.exercise);
  const { isCapitalized, userTranslation } = exercise;
  const dispatch = useDispatch();

  const updateUserTranslation = dispatch(value =>
    exerciseActions.updateUserTranslation(value)
  );

  useEffect(() => {
    const handleSpecialCharacter = event => {
      const letter = event.target.name;
      updateUserTranslation(userTranslation + letter);
    };

    const formattedCharacters = charactersLine.map(character => {
      const name = isCapitalized ? character.toUpperString() : character;
      return (
        <Character
          onClick={handleSpecialCharacter}
          name={name}
          type="button"
          key={character}
        >
          {character}
        </Character>
      );
    });

    setCharacters(formattedCharacters);
  }, [
    isCapitalized,
    characters,
    updateUserTranslation,
    userTranslation,
    charactersLine,
  ]);

  return characters;
};

export default useCharacters;
