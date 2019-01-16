import React from "react";
import { GoogleLogin } from "react-google-login";
import googleAuth from "../../controllers/auth/googleAuth.function";
import secrets from "../../config/secrets";
import { LanguageContext } from "../../contexts/language-context";
import { user } from "../../contexts/user-context";

const responseGoogle = async response => {
  let authResponse = await googleAuth(response.accessToken);
  if (authResponse !== "no active session") {
    let userData = JSON.parse(authResponse);
    user.logInUser(userData.email);
  }
};

const responseError = response => {
  console.log(response);
};

class LoginWithGoogle extends React.Component {
  render() {
    let language = this.context;
    return (
      <GoogleLogin
        clientId={secrets.GOOGLE_CLIENT_ID}
        render={renderProps => (
          <button onClick={renderProps.onClick} className="googleButton">
            <i className="fa fa-google" />
            <p className="loginInstructions">
              {language.navigation.connect_with_google}
            </p>
          </button>
        )}
        onSuccess={responseGoogle}
        onFailure={responseError}
      />
    );
  }
}

export default LoginWithGoogle;

LoginWithGoogle.contextType = LanguageContext;
