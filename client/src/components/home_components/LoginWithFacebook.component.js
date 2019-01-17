import React from "react";
import secrets from "../../config/secrets";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { LanguageContext } from "../../contexts/language-context";

class LoginWithFacebook extends React.Component {
  responseFacebook = async response => {
    console.log(response);
    let authResponse = await facebookAuth(response.accessToken);
    if (authResponse !== "no active session") {
      let userData = JSON.parse(authResponse);
      this.props.loginUser(userData.email); //login logic is centralized in app.js
    }
  };

  render() {
    let language = this.context;
    return (
      <FacebookLogin
        appId={secrets.FACEBOOK_APP_ID}
        autoLoad={true}
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
