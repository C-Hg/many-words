import React from "react";
import { Link } from "react-router-dom";
import "./styles/Home.scss";
import LoginWithGoogle from "./home_components/LoginWithGoogle.component";
import { LanguageContext } from "../contexts/language-context";
import { user } from "../contexts/user-context";

class Home extends React.Component {
  render() {
    let language = this.context;

    return (
      <div className="home">
        <h1>Enhance your vocabulary for free.</h1>
        <h2>Enjoy the French/English pair now.</h2>
        <h2>
          Log in to register your progress, or check out the{" "}
          <Link to={`/curriculum`}>Curriculum</Link>
        </h2>
        {/* TO DO : move google Login to its own component to consume multiple contexts */}
        {!user.isAuthenticated && <LoginWithGoogle />}
      </div>
    );
  }
}

Home.contextType = LanguageContext;

export default Home;
