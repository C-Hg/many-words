import React, { useContext } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { LanguageContext } from "../../contexts/language-context";

const mapStateToProps = state => ({ exercise: state.exercise });

const ExerciseTitle = props => {
  const language = useContext(LanguageContext);
  const { exercise } = props;
  const { words, isWeakWordsMode, status } = exercise;
  const { lesson, theme } = words[0];

  if (status === "recap" && isWeakWordsMode) {
    return <h1 className="exerciseTitle">{language.revision}</h1>;
  }
  return <h1 className="exerciseTitle">{language.lessons[theme][lesson]}</h1>;
};

ExerciseTitle.propTypes = {
  exercise: {
    status: PropTypes.string.isRequired,
    isWeakWordsMode: PropTypes.bool.isRequired,
  }.isRequired,
};
export default connect(
  mapStateToProps,
  null
)(ExerciseTitle);
