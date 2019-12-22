import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import P from "../../components/texts/P.styled";
import VerticalFlexbox from "../../components/div/VerticalFlexbox.styled";

const mapStateToProps = state => ({ exercise: state.exercise });

const WordsToRemember = props => {
  const { exercise } = props;
  const words = exercise.failedWords.map(val => {
    return (
      <P textAlign="left" margin="0" key={`${val[0]}`}>
        {val[0]} : {val[1]}
      </P>
    );
  });
  return (
    <VerticalFlexbox width="50%" margin="0 0 30px">
      {words}
    </VerticalFlexbox>
  );
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
