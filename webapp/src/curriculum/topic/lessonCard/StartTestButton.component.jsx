import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Play } from "styled-icons/evil";
import { ThemeContext } from "styled-components";

import { actions as exerciseActions } from "../../../exercise/exercise.reducer";

const mapStateToProps = state => ({ exercise: state.exercise });

const mapDispatchToProps = dispatch => ({
  getWords: (lesson, theme) => {
    dispatch(exerciseActions.getWords(lesson, theme));
  },
});

const StartTestButton = props => {
  const { match, lesson, theme, getWords } = props;
  const styleTheme = useContext(ThemeContext);
  return (
    <Link
      to={`${match.url}/${lesson}/test`}
      onClick={() => getWords(lesson, theme)}
    >
      <Play size="48" alt="Start exercise" color={styleTheme.colors.green} />
    </Link>
  );
};

StartTestButton.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  lesson: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  getWords: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartTestButton);
