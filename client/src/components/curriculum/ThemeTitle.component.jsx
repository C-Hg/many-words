import React, { useContext } from "react";
import PropTypes from "prop-types";
import { LanguageContext } from "../../contexts/language-context";

const ThemeTitle = props => {
  const { theme } = props;
  const language = useContext(LanguageContext);
  return <div className="themeTitle">{language.themes[theme]}</div>;
};

ThemeTitle.propTypes = {
  theme: PropTypes.string.isRequired,
};

export default ThemeTitle;
