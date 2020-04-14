import React, { useContext } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ThemeContext } from "styled-components";

import { LanguageContext } from "../contexts/language-context";
import { actions as learnActions } from "../redux/reducers/learn";
import ButtonContainer from "../components/buttons/ButtonContainer.styled";
import MainButton from "../components/buttons/MainButton.styled";

function mapStateToProps(state) {
  return { learn: state.learn };
}

const mapDispatchToProps = dispatch => {
  return {
    toggleIsDefinite: () => {
      dispatch(learnActions.toggleIsDefinite());
    },
  };
};

const DefiniteOrIndefiniteSwitch = props => {
  const { toggleIsDefinite, learn } = props;
  const theme = useContext(ThemeContext);
  const language = useContext(LanguageContext);
  const { definite, indefinite } = language;

  return (
    <ButtonContainer mid margin="10px">
      <MainButton
        color={theme.colors.darkBlue}
        onClick={toggleIsDefinite}
        type="button"
      >
        {learn.isDefinite ? definite : indefinite}
      </MainButton>
    </ButtonContainer>
  );
};

DefiniteOrIndefiniteSwitch.propTypes = {
  toggleIsDefinite: PropTypes.func.isRequired,
  learn: PropTypes.shape({
    isDefinite: PropTypes.bool.isRequired,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefiniteOrIndefiniteSwitch);
