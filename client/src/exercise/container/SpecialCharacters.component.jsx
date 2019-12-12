import React, { useContext } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ThemeContext } from "styled-components";

import { actions as exerciseActions } from "../../redux/reducers/exercise";
import Character from "./styled/Character.styled";
import CharactersLine from "./styled/CharactersLine.styled";
import MainButton from "../../components/buttons/MainButton.styled";
import ButtonContainer from "../../components/buttons/ButtonContainer.styled";

const mapStateToProps = state => ({ exercise: state.exercise });

const mapDispatchToProps = dispatch => ({
  toggleSpecialCharacters: () => {
    dispatch(exerciseActions.toggleSpecialCharacters());
  },
  updateUserTranslation: value => {
    dispatch(exerciseActions.updateUserTranslation(value));
  },
});

const characters = ["à", "â", "ç", "é", "è", "ê", "ë", "î", "ï", "ô", "ù", "û"];

const SpecialCharacters = props => {
  const theme = useContext(ThemeContext);
  const { exercise, toggleSpecialCharacters, updateUserTranslation } = props;
  const { userTranslation, areSpecialCharactersVisible } = exercise;

  const handleSpecialCharacter = event => {
    const letter = event.target.name;
    updateUserTranslation(userTranslation + letter);
  };

  // TODO: transform each letter into a component
  const characterButtons = characters.map(character => (
    <Character
      onClick={handleSpecialCharacter}
      name={character}
      type="button"
      key={character}
    >
      {character}
    </Character>
  ));

  const isVisible = areSpecialCharactersVisible;
  // the element is rendered only for english speakers when translating to French
  // space is reserved for better visual experience
  // TODO: refactor the selectedForm array to transform it into an object

  if (isVisible) {
    return <CharactersLine>{characterButtons}</CharactersLine>;
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

SpecialCharacters.propTypes = {
  exercise: PropTypes.shape({
    userTranslation: PropTypes.string.isRequired,
    areSpecialCharactersVisible: PropTypes.bool.isRequired,
    wordRank: PropTypes.number.isRequired,
    words: PropTypes.arrayOf(
      PropTypes.shape({
        selectedForm: PropTypes.array.isRequired,
      })
    ),
  }).isRequired,
  toggleSpecialCharacters: PropTypes.func.isRequired,
  updateUserTranslation: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpecialCharacters);
