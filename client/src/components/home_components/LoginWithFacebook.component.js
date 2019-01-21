import React from "react";
import secrets from "../../config/secrets";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { LanguageContext } from "../../contexts/language-context";
import facebookAuth from "../../controllers/auth/facebookAuth.function";

class LoginWithFacebook extends React.Component {
  responseFacebook = async response => {
    let authResponse = await facebookAuth(response.accessToken);
    let userData = JSON.parse(authResponse);
    this.props.loginUser(userData.email); //login logic is centralized in app.js
  };

  render() {
    let language = this.context;
    let languageClass;
    let loginInstructions;
    console.log(secrets);
    if (language.language === "english") {
      languageClass = "login-button-english";
      loginInstructions = "login-instructions-english";
    } else {
      languageClass = "login-button-french";
      loginInstructions = "login-instructions-french";
    }
    return (
      <FacebookLogin
        appId={secrets.FACEBOOK_APP_ID}
        autoLoad={false} //prevents auto connection with facebook on page load : user must be able to choose
        fields="email"
        render={renderProps => (
          <button onClick={renderProps.onClick} className="facebookButton">
            <div className={`loginButtonContent ${languageClass}`}>
              <i className="fa fa-facebook" />
              <p className={loginInstructions}>
                {language.navigation.login_with + " Facebook"}
              </p>
            </div>
          </button>
        )}
        callback={this.responseFacebook}
        icon="fa-facebook"
      />
    );
  }
}

export default LoginWithFacebook;

LoginWithFacebook.contextType = LanguageContext;
