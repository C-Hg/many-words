import React from "react";
import secrets from "../../../config/secrets";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
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

class LoginWithFacebook extends React.Component {
  responseFacebook = response => {
    this.props.attemptLogin("facebook", response.accessToken);
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

export default connect(
  null,
  mapDispatchToProps
)(LoginWithFacebook);

LoginWithFacebook.contextType = LanguageContext;
