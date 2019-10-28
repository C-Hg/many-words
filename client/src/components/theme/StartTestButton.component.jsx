import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { LanguageContext } from "../../contexts/language-context";
import { actions as exerciseActions } from "../../redux/reducers/exercise";

function mapStateToProps(state) {
  return { exercise: state.exercise };
}

const mapDispatchToProps = dispatch => {
  return {
    getWords: (lesson, theme) => {
      dispatch(exerciseActions.getWords(lesson, theme));
    },
  };
};

const StartTestButton = props => {
  const { match, lesson, theme, getWords } = props;
  const language = context;
  return (
    <Link
      to={`${match.url}/${lesson}/test`}
      className="startTest"
      onClick={() => getWords(lesson, theme)}
    >
      <i alt="Start exercise" className="material-icons md-36">
        play_circle_outline
      </i>
      <p className="startButtonTitle">{language.start_exercise}</p>
    </Link>
  );
};

StartTestButton.propTypes = {
  match: {
    url: PropTypes.string.isRequired,
  }.isRequired,
  lesson: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  getWords: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartTestButton);

StartTestButton.contextType = LanguageContext;
