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
    toggleGender: () => {
      dispatch(learnActions.toggleGender());
    },
  };
};

const GenderSwitch = props => {
  const { toggleGender, learn } = props;
  const theme = useContext(ThemeContext);
  const language = useContext(LanguageContext);
  const { masculine, feminine } = language;
  return (
    <ButtonContainer mid margin="10px">
      <MainButton
        color={theme.colors.darkBlue}
        onClick={toggleGender}
        type="button"
      >
        {learn.gender === "masculine" ? masculine : feminine}
      </MainButton>
    </ButtonContainer>
  );
};

GenderSwitch.propTypes = {
  toggleGender: PropTypes.func.isRequired,
  learn: PropTypes.shape({
    gender: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GenderSwitch);
