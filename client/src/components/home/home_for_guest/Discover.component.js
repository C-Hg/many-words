import React from "react";
import { LanguageContext } from "../../../contexts/language-context";
import { Link } from "react-router-dom";
import AboutButton from "../AboutButton.component";

function Register() {
  return (
    <LanguageContext.Consumer>
      {({ home }) => (
        <div className="discover">
          <h2 className="discoverTitle">{home.discover}</h2>
          <Link to="/curriculum">
            <button className="discoverButton">{home.discover_button}</button>
          </Link>
          <AboutButton contextualClass="discoverButton" />
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default Register;
