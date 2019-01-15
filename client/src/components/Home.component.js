import React from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../contexts/language-context";
import { GoogleLogin } from "react-google-login";
import googleAuth from "../controllers/auth/googleAuth.function";
import secrets from "../config/secrets";
import "./styles/Home.scss";
import { UserContext } from "../contexts/user-context";

class Home extends React.Component {
  render() {
    console.log(this.context);
    let user = this.context;
    const responseGoogle = async response => {
      let authResponse = await googleAuth(response.accessToken);
      if (authResponse);
    };

    const responseError = response => {
      console.log(response);
    };

    return (
      <div className="home">
        <h1>Enhance your vocabulary for free.</h1>
        <h2>Enjoy the French/English pair now.</h2>
        <h2>
          Log in to register your progress, or check out the{" "}
          <Link to={`/curriculum`}>Curriculum</Link>
        </h2>
        {/* TO DO : move google Login to its own component to consume multiple contexts */}
        {!user.isAuthenticated && (
          <GoogleLogin
            clientId={secrets.GOOGLE_CLIENT_ID}
            render={renderProps => (
              <button onClick={renderProps.onClick} className="googleButton">
                <i className="fa fa-google" />
                <p className="loginInstructions">
                  {/*language.navigation.connect_with_google*/}
                </p>
              </button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseError}
          />
        )}
      </div>
    );
  }
}

Home.contextType = UserContext;

export default Home;
