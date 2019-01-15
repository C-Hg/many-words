import React from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../contexts/language-context";
import GoogleLogin from "react-google-login";
import googleAuth from "../controllers/auth/googleAuth.function";
import secrets from "../config/secrets";

class Home extends React.Component {
  render() {
    //let language = this.context;
    const responseGoogle = async response => {
      let authResponse = await googleAuth(response.accessToken);
      if (authResponse);
    };

    const responseError = response => {
      console.log(response);
    };

    return (
      <div className="home">
        <Link to={`${this.props.match.path}curriculum`}>Curriculum</Link>
        <GoogleLogin
          clientId={secrets.GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseError}
        />
      </div>
    );
  }
}

Home.contextType = LanguageContext;

export default Home;
