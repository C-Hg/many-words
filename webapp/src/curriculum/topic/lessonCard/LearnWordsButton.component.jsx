import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "styled-components";
import PropTypes from "prop-types";
import { Question } from "styled-icons/evil";

const LearnWordsButton = props => {
  const styleTheme = useContext(ThemeContext);
  const { match, lesson } = props;
  return (
    <Link to={`${match.url}/${lesson}/learn`}>
      <Question
        alt="Learn words"
        size="48"
        color={styleTheme.colors.darkBlue}
      />
    </Link>
  );
};

LearnWordsButton.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  lesson: PropTypes.string.isRequired,
};

export default LearnWordsButton;
