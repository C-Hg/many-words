import React from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../contexts/language-context";
import GoogleLogin from "react-google-login";

class Home extends React.Component {
  render() {
    let language = this.context;
    const responseGoogle = response => {
      console.log(response);
    };

    return (
      <div className="home">
        <Link to={`${this.props.match.path}curriculum`}>Curriculum</Link>
        <GoogleLogin
          clientId="698239669940-ekd7gksv36tt6cd5l4cnumtlf7rdj84b.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
      </div>
    );
  }
}

Home.contextType = LanguageContext;

export default Home;
