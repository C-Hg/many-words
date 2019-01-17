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
    return (
      <FacebookLogin
        appId={secrets.FACEBOOK_APP_ID}
        autoLoad={false} //prevents auto connection with facebook on page load : user must be able to choose
        fields="email"
        render={renderProps => (
          <button onClick={renderProps.onClick}>
            {language.navigation.login_with + " Facebook"}
          </button>
        )}
        callback={this.responseFacebook}
        cssClass="my-facebook-button-class"
        icon="fa-facebook"
      />
    );
  }
}

export default LoginWithFacebook;

LoginWithFacebook.contextType = LanguageContext;
