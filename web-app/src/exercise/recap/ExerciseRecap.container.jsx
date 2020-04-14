import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import LessonResult from "./LessonResult.component";
import WordsToRemember from "./WordsToRemember.component";
import VerticalFlexbox from "../../components/div/VerticalFlexbox.styled";
import ExitButton from "./ExitButton.component ";
import ContinueButton from "./ContinueButton.component";

const mapStateToProps = state => ({ exercise: state.exercise });

const ExerciseRecap = props => {
  const { exercise } = props;
  return (
    <VerticalFlexbox>
      <LessonResult />
      {exercise.failedWords.length > 0 && <WordsToRemember />}
      <VerticalFlexbox>
        <ContinueButton />
        <ExitButton />
      </VerticalFlexbox>
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
