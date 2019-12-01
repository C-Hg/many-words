import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import HorizontalFlexbox from "../div/HorizontalFlexbox.styled";
import FrenchFlag from "../../images/flags/France.png";
import FlagContainer from "../div/FlagContainer.styled";
import Flag from "../images/Flag.styled";
import H3 from "../texts/H3.styled";

const mapStateToProps = state => ({ exercise: state.exercise });

const OriginWord = props => {
  const { exercise } = props;
  const { words, wordRank } = exercise;
  const word = words[wordRank][words[wordRank].selectedForm[1]][0];
  return (
    <HorizontalFlexbox justifyContent="flex-start" sand>
      <FlagContainer>
        <Flag src={FrenchFlag} alt="French flag" />
      </FlagContainer>
      <H3 margin="0" textAlign="left" fontSize="22px" padding="0 0 5px" sand>
        {word}
      </H3>
    </HorizontalFlexbox>
  );
};

OriginWord.propTypes = {
  exercise: PropTypes.shape({
    words: PropTypes.arrayOf(
      PropTypes.shape({
        selectedForm: PropTypes.array.isRequired,
      })
    ),
    wordRank: PropTypes.number.isRequired,
  }).isRequired,
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
