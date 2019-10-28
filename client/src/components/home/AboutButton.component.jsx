import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { LanguageContext } from "../../contexts/language-context";

// contextual class allows different layout for landing page and user stats page

const AboutButton = props => {
  const { contextualClass } = props;
  return (
    <LanguageContext.Consumer>
      {({ home }) => (
        <Link to="/about">
          <button className={`aboutButton ${contextualClass}`} type="button">
            {home.about}
          </button>
        </Link>
      )}
    </LanguageContext.Consumer>
  );
};

AboutButton.propTypes = {
  contextualClass: PropTypes.string.isRequired,
};

export default AboutButton;
