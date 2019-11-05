import React, { useContext } from "react";
import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import secrets from "../../../config/secrets";
import { LanguageContext } from "../../../contexts/language-context";
import { actions as authActions } from "../../../redux/reducers/auth";

const mapDispatchToProps = dispatch => ({
  attemptLogin: (provider, token) => {
    dispatch(authActions.attemptLogin(provider, token));
  },
});

const LoginWithGoogle = props => {
  const language = useContext(LanguageContext);
  const { attemptLogin } = props;

  const responseGoogle = response => {
    // TO DO : failure message if authResponse = "unauthorized", seems ok with try-catch
    attemptLogin("google", response.accessToken);
  };

  const responseError = response => {
    console.error(response);
  };

  let languageClass;
  let loginInstructions;
  if (language.language === "english") {
    languageClass = "login-button-english";
    loginInstructions = "login-instructions-english";
  } else {
    languageClass = "login-button-french";
    loginInstructions = "login-instructions-french";
  }
  return (
    <GoogleLogin
      clientId={secrets.GOOGLE_CLIENT_ID}
      render={renderProps => (
        <button
          onClick={renderProps.onClick}
          className="googleButton"
          type="button"
        >
          <div className={`loginButtonContent ${languageClass}`}>
            <i className="fa fa-google" />
            <p className={loginInstructions}>
              {`${language.navigation.login_with} Google`}
            </p>
          </div>
        </button>
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
