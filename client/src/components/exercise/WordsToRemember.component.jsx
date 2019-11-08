import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const mapStateToProps = state => ({ exercise: state.exercise });

const WordsToRemember = props => {
  const { exercise } = props;
  const words = exercise.failedWords.map(val => {
    return (
      <div key={`${val[0]}`}>
        {val[0]} : {val[1]}
      </div>
    );
  });
  return <div className="missedWords">{words}</div>;
};

WordsToRemember.propTypes = {
  exercise: PropTypes.shape({
    failedWords: PropTypes.array.isRequired,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  null
)(WordsToRemember);
