import React from "react";
import { Link } from "react-router-dom";

import { LanguageContext } from "../../../contexts/language-context";
import AboutButton from "../AboutButton.component";

function Register() {
  return (
    <LanguageContext.Consumer>
      {({ home }) => (
        <div className="discover">
          <h2 className="discoverTitle">{home.discover}</h2>
          <Link to="/curriculum">
            <button className="discoverButton" type="button">
              {home.discover_button}
            </button>
          </Link>
          <AboutButton contextualClass="discoverButton" />
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default Register;
