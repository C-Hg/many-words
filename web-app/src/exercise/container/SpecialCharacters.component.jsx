import React, { useContext } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ThemeContext } from "styled-components";

import { actions as exerciseActions } from "../exercise.reducer";
import CharactersLine from "./styled/CharactersLine.styled";
import MainButton from "../../components/buttons/MainButton.styled";
import ButtonContainer from "../../components/buttons/ButtonContainer.styled";
import VerticalFlexbox from "../../components/div/VerticalFlexbox.styled";
import useCharacters from "./useCharacters";

const mapStateToProps = state => ({ exercise: state.exercise });

const mapDispatchToProps = dispatch => ({
  toggleSpecialCharacters: () => {
    dispatch(exerciseActions.toggleSpecialCharacters());
  },
});

const line1 = ["à", "â", "æ", "œ", "ç"];
const line2 = ["é", "è", "ê", "ë", "î", "ï", "ô", "ù", "û", "ü"];

const SpecialCharacters = props => {
  const theme = useContext(ThemeContext);
  const { exercise, toggleSpecialCharacters } = props;
  const { areSpecialCharactersVisible } = exercise;

  const charactersLine1 = useCharacters(line1);
  const charactersLine2 = useCharacters(line2);

  const isVisible = areSpecialCharactersVisible;
  // the element is rendered only for english speakers when translating to French
  // space is reserved for better visual experience
  // TODO: refactor the selectedForm array to transform it into an object

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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpecialCharacters);
