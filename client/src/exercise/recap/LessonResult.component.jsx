import React, { useContext } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { LanguageContext } from "../../contexts/language-context";
import H2 from "../../components/texts/H2.styled";

const mapStateToProps = state => ({ exercise: state.exercise });

const LessonResult = props => {
  const { exercise } = props;
  const errors = exercise.failedWords.length;
  const language = useContext(LanguageContext);
  const {
    noMistake,
    oneMistake,
    oneMistakeInstruction,
    moreMistakes,
  } = language;

  let content;
  if (!errors) {
    content = noMistake;
  } else if (errors === 1) {
    content = (
      <>
        <div>{oneMistake}</div>
        <div>{oneMistakeInstruction}</div>
      </>
    );
  } else {
    content = moreMistakes;
  }

  return <H2 margin="0 0 30px">{content}</H2>;
};

LessonResult.propTypes = {
  exercise: PropTypes.shape({
    failedWords: PropTypes.array.isRequired,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  null
)(LessonResult);
