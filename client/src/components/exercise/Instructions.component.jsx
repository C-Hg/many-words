import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { LanguageContext } from "../../contexts/language-context";

const mapStateToProps = state => ({ exercise: state.exercise });

const Instructions = props => {
  const { exercise } = props;
  const { words, wordRank } = exercise;

  let sourceLanguageIsFr = true;
  if (words[wordRank].selectedForm[1] === "en") {
    sourceLanguageIsFr = false;
  }
  return (
    <LanguageContext.Consumer>
      {({ translateIn, french, english }) => (
        <div className="instructions">
          {translateIn} {sourceLanguageIsFr ? english : french}
        </div>
      )}
    </LanguageContext.Consumer>
  );
};

Instructions.propTypes = {
  exercise: {
    wordRank: PropTypes.number.isRequired,
  }.isRequired,
};

export default connect(
  mapStateToProps,
  null
)(Instructions);
