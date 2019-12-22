import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import LessonResult from "./LessonResult.component";
import WordsToRemember from "./WordsToRemember.component";
import ExitLinks from "./ExitLinks.component";
import VerticalFlexbox from "../../components/div/VerticalFlexbox.styled";

const mapStateToProps = state => ({ exercise: state.exercise });

const ExerciseRecap = props => {
  const { exercise } = props;
  return (
    <VerticalFlexbox>
      <LessonResult />
      {exercise.failedWords.length > 0 && <WordsToRemember />}
      <ExitLinks />
    </VerticalFlexbox>
  );
};

ExerciseRecap.propTypes = {
  exercise: PropTypes.shape({
    failedWords: PropTypes.array.isRequired,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  null
)(ExerciseRecap);
