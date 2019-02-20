import React from "react";
import { LanguageContext } from "../../contexts/language-context";
import { Link } from "react-router-dom";

function AboutButton() {
  return (
    <LanguageContext.Consumer>
      {({ home }) => (
        <Link to={"/about"}>
          <button className="aboutButton homeFooterButton">{home.about}</button>
        </Link>
      )}
    </LanguageContext.Consumer>
  );
}

export default AboutButton;
