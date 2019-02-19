import React from "react";
import { LanguageContext } from "../../contexts/language-context";

function Welcome() {
  return (
    <LanguageContext.Consumer>
      {({ home }) => (
        <div className="welcomeInstructions">
          <h1 className="homeTitle">{home.main_title}</h1>
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default Welcome;
