import React from "react";
import { GoogleLogin } from "react-google-login";
import secrets from "../../../config/secrets";
import { LanguageContext } from "../../../contexts/language-context";

import { actions as authActions } from "../../../redux/reducers/auth";
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => {
  return {
    attemptLogin: (provider, token) => {
      dispatch(authActions.attemptLogin(provider, token));
    }
  };
};

class LoginWithGoogle extends React.Component {
  responseGoogle = response => {
    // TO DO : failure message if authResponse = "unauthorized", seems ok with try-catch
    this.props.attemptLogin("google", response.accessToken);
  };

  responseError = response => {
    console.log(response);
  };

  render() {
    let language = this.context;
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
          <button onClick={renderProps.onClick} className="googleButton">
            <div className={`loginButtonContent ${languageClass}`}>
              <i className="fa fa-google" />
              <p className={loginInstructions}>
                {language.navigation.login_with + " Google"}
              </p>
            </div>
          </button>
        )}
        onSuccess={this.responseGoogle}
        onFailure={this.responseError}
      />
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(LoginWithGoogle);

LoginWithGoogle.contextType = LanguageContext;
