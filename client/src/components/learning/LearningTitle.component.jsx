import React, { useContext } from "react";
import PropTypes from "prop-types";

import { LanguageContext } from "../../contexts/language-context";

const LearningTitle = props => {
  const { theme, lesson } = props;
  const language = useContext(LanguageContext);
  return <h1 className="learningTitle">{language.lessons[theme][lesson]}</h1>;
};

LearningTitle.propTypes = {
  theme: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
};

export default LearningTitle;
