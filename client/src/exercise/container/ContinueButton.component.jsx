import React, { useContext } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ThemeContext } from "styled-components";

import { LanguageContext } from "../../contexts/language-context";
import { actions as exerciseActions } from "../../redux/reducers/exercise";
import ButtonContainer from "../../components/buttons/ButtonContainer.styled";
import MainButton from "../../components/buttons/MainButton.styled";

const mapDispatchToProps = dispatch => ({
  submitUserTranslation: () => {
    dispatch(exerciseActions.submitUserTranslation());
  },
});

const ContinueButton = props => {
  const language = useContext(LanguageContext);
  const theme = useContext(ThemeContext);
  const { submitUserTranslation } = props;

  return (
    <ButtonContainer margin="0 0 0 auto" mid>
      <MainButton
        onClick={submitUserTranslation}
        color={theme.colors.darkBlue}
        type="button"
        fast
      >
        {language.check_button}
      </MainButton>
    </ButtonContainer>
  );
};

ContinueButton.propTypes = {
  submitUserTranslation: PropTypes.func.isRequired,
};

export default connect(
  null,
  mapDispatchToProps
)(ContinueButton);
