import React, { useContext } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ThemeContext } from "styled-components";

import { LanguageContext } from "../contexts/language-context";
import { actions as learnActions } from "../redux/reducers/learn";
import ButtonContainer from "../components/buttons/ButtonContainer.styled";
import MainButton from "../components/buttons/MainButton.styled";

const mapStateToProps = state => {
  return { learn: state.learn };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleNumber: () => {
      dispatch(learnActions.toggleNumber());
    },
  };
};

const NumberSwitch = props => {
  const { learn, toggleNumber } = props;
  const theme = useContext(ThemeContext);
  const language = useContext(LanguageContext);
  const { singular, plural } = language;

  return (
    <ButtonContainer mid margin="10px">
      <MainButton
        color={theme.colors.darkBlue}
        onClick={toggleNumber}
        type="button"
      >
        {learn.number === "singular" ? singular : plural}
      </MainButton>
    </ButtonContainer>
  );
};

NumberSwitch.propTypes = {
  toggleNumber: PropTypes.func.isRequired,
  learn: PropTypes.shape({
    number: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NumberSwitch);
