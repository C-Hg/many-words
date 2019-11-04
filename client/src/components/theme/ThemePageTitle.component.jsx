import React, { useContext } from "react";
import PropTypes from "prop-types";
import { LanguageContext } from "../../contexts/language-context";

const ThemePageTitle = props => {
  const { theme } = props;
  const language = useContext(LanguageContext);
  return <h1 className="menuTitle themePageTitle">{language.themes[theme]}</h1>;
};

ThemePageTitle.propTypes = {
  theme: PropTypes.string.isRequired,
};

export default ThemePageTitle;
