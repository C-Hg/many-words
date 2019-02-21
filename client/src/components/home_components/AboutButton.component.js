import React from "react";
import { LanguageContext } from "../../contexts/language-context";
import { Link } from "react-router-dom";

// contextual class allows different layout for landing page and user stats page

function AboutButton(props) {
  return (
    <LanguageContext.Consumer>
      {({ home }) => (
        <Link to={"/about"}>
          <button className={`aboutButton ${props.contextualClass}`}>
            {home.about}
          </button>
        </Link>
      )}
    </LanguageContext.Consumer>
  );
}

export default AboutButton;
