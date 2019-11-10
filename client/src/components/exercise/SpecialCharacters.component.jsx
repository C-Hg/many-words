import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { actions as exerciseActions } from "../../redux/reducers/exercise";

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
  const { exercise, toggleSpecialCharacters, updateUserTranslation } = props;
  const {
    userTranslation,
    areSpecialCharactersVisible,
    words,
    wordRank,
  } = exercise;

  const handleSpecialCharacter = event => {
    const letter = event.target.name;
    updateUserTranslation(userTranslation + letter);
  };

  // TODO: transform each letter into a component
  const characterButtons = characters.map(character => (
    <button
      className="specialCharacter"
      onClick={handleSpecialCharacter}
      name={character}
      type="button"
      key={character}
    >
      {character}
    </button>
  ));

  const isVisible = areSpecialCharactersVisible;
  const visibilityClass = isVisible
    ? "specialCharacters-visible"
    : "specialCharacters-invisible";
  // the element is rendered only for english speakers when translating to French
  // space is reserved for better visual experience
  // TODO: refactor the selectedForm array to transform it into an object
  if (words[wordRank].selectedForm[1] === "fr") {
    return <div className="specialCharacters noborder" />; // reserving space
  }

  return (
    <div className={`specialCharacters ${visibilityClass}`}>
      {!isVisible && (
        <button
          className="toggleSpecialCharacters"
          onClick={toggleSpecialCharacters}
          type="button"
        >
          Special characters
        </button>
      )}
      {isVisible && <div className="keys">{characterButtons}</div>}
    </div>
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
