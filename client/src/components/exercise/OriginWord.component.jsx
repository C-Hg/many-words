import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const mapStateToProps = state => ({ exercise: state.exercise });

const OriginWord = props => {
  const { exercise } = props;
  const { words, wordRank } = exercise;
  const word = words[wordRank][words[wordRank].selectedForm[1]][0];
  return <div className="originWord">{word}</div>;
};

OriginWord.propTypes = {
  exercise: {
    words: PropTypes.shape([
      {
        selectedForm: PropTypes.array.isRequired,
      },
    ]),
    wordRank: PropTypes.number.isRequired,
  }.isRequired,
};

export default connect(
  mapStateToProps,
  null
)(OriginWord);

/* 
  words is an array of objects, containing
  { fr: [possible FR forms],
    en: [possible EN forms],
    selectedForm: [enName, source_language, selectedForm],
    theme,
    lesson
  }
*/
