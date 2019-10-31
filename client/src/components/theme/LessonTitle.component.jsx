import React, { useContext } from "react";
import PropTypes from "prop-types";
import { LanguageContext } from "../../contexts/language-context";

const LessonTitle = props => {
  const { theme, lesson } = props;
  const language = useContext(LanguageContext);

  return (
    <div className="cardTitleContainer">
      <h2 className="lessonTitle">{language.lessons[theme][lesson]}</h2>
    </div>
  );
};

LessonTitle.propTypes = {
  theme: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
};

export default LessonTitle;
