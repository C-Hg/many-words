import React from "react";
import { GoogleLogin } from "react-google-login";
import googleAuth from "../../controllers/auth/googleAuth.function";
import secrets from "../../config/secrets";
import { LanguageContext } from "../../contexts/language-context";

class LoginWithGoogle extends React.Component {
  responseGoogle = async response => {
    let authResponse = await googleAuth(response.accessToken);
    // TO DO : failure message if authResponse = "unauthorized"
    let userData = JSON.parse(authResponse);
    this.props.loginUser(userData.email); //login logic is centralized in app.js
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

export default LoginWithGoogle;

LoginWithGoogle.contextType = LanguageContext;
