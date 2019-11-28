import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ThemeContext } from "styled-components";

import { LanguageContext } from "../contexts/language-context";
import { actions as exerciseActions } from "../redux/reducers/exercise";
import MainButton from "../components/buttons/MainButton.styled";
import ButtonContainer from "../components/buttons/ButtonContainer.styled";

const mapDispatchToProps = dispatch => ({
  getWeakWords: reference => {
    dispatch(exerciseActions.getWeakWords(reference));
  },
});

const WeakWords = props => {
  const { reference, getWeakWords } = props;
  const language = useContext(LanguageContext);
  const theme = useContext(ThemeContext);

  return (
    <Link to="/weak_words">
      <ButtonContainer large>
        <MainButton
          onClick={() => getWeakWords(reference)}
          type="button"
          color={theme.colors.green}
        >
          {language.navigation.weak_words}
        </MainButton>
      </ButtonContainer>
    </Link>
  );
};

WeakWords.propTypes = {
  reference: PropTypes.string.isRequired,
  getWeakWords: PropTypes.func.isRequired,
};

export default connect(
  null,
  mapDispatchToProps
)(WeakWords);