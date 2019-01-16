import React from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../contexts/language-context";

function Welcome() {
  return (
    <LanguageContext.Consumer>
      {({ home }) => (
        <div className="welcomeInstructions">
          <h1>{home.main_title}</h1>
          <h2>Enjoy the French/English pair now.</h2>
          <h2>
            Log in to register your progress, or check out the{" "}
            <Link to={`/curriculum`}>Curriculum</Link>
          </h2>
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default Welcome;
