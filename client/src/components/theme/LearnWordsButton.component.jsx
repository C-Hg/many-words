import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { LanguageContext } from "../../contexts/language-context";

const LearnWordsButton = props => {
  const language = useContext(LanguageContext);
  const { match, lesson } = props;
  return (
    <Link to={`${match.url}/${lesson}/learn`} className="startLearning">
      <i alt="Learn words" className="material-icons md-36">
        add
      </i>
      <p className="startButtonTitle">{language.start_learning}</p>
    </Link>
  );
};

LearnWordsButton.propTypes = {
  match: {
    url: PropTypes.string.isRequired,
  }.isRequired,
  lesson: PropTypes.string.isRequired,
};

export default LearnWordsButton;
