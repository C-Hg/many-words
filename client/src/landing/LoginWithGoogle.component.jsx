import React, { useContext } from "react";
import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";
import { Google } from "styled-icons/fa-brands";
import { ThemeContext } from "styled-components";
import PropTypes from "prop-types";

import secrets from "../config/secrets";
import { LanguageContext } from "../contexts/language-context";
import { actions as authActions } from "../redux/reducers/auth";
import ButtonContainer from "../components/buttons/ButtonContainer.styled";
import MainButton from "../components/buttons/MainButton.styled";

const mapDispatchToProps = dispatch => ({
  attemptLogin: (provider, token) => {
    dispatch(authActions.attemptLogin(provider, token));
  },
});

const LoginWithGoogle = props => {
  const language = useContext(LanguageContext);
  const theme = useContext(ThemeContext);
  const { attemptLogin } = props;

  const responseGoogle = response => {
    // TO DO : failure message if authResponse = "unauthorized", seems ok with try-catch
    attemptLogin("google", response.accessToken);
  };

  const responseError = response => {
    console.error(response);
  };

  return (
    <GoogleLogin
      clientId={secrets.GOOGLE_CLIENT_ID}
      render={renderProps => (
        <ButtonContainer large>
          <MainButton
            onClick={renderProps.onClick}
            type="button"
            color={theme.colors.googleRed}
          >
            <Google size="18" />
            {`${language.navigation.login_with} Google`}
          </MainButton>
        </ButtonContainer>
      )}
      onSuccess={responseGoogle}
      onFailure={responseError}
    />
  );
};

LoginWithGoogle.propTypes = {
  attemptLogin: PropTypes.func.isRequired,
};

export default connect(
  null,
  mapDispatchToProps
)(LoginWithGoogle);
