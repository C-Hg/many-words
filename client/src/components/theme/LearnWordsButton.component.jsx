import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "styled-components";
import PropTypes from "prop-types";
import { Loupe } from "styled-icons/material";

const LearnWordsButton = props => {
  const styleTheme = useContext(ThemeContext);
  const { match, lesson } = props;
  return (
    <Link to={`${match.url}/${lesson}/learn`}>
      <Loupe alt="Learn words" size="36" color={styleTheme.colors.darkBlue} />
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
