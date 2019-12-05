import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import HorizontalFlexbox from "../../components/div/HorizontalFlexbox.styled";
import frenchFlag from "../../images/flags/France.png";
import ukFlag from "../../images/flags/UK.png";
import FlagContainer from "../../components/div/FlagContainer.styled";
import Flag from "../../components/images/Flag.styled";
import H3 from "../../components/texts/H3.styled";

const mapStateToProps = state => ({ exercise: state.exercise });

// TODO: update selectedForm data structure
const OriginWord = props => {
  const { exercise } = props;
  const { words, wordRank } = exercise;
  const word = words[wordRank][words[wordRank].selectedForm[1]];
  const language = words[wordRank].selectedForm[1];
  const flag = language === "fr" ? frenchFlag : ukFlag;

  return (
    <HorizontalFlexbox
      justifyContent="flex-start"
      height="40px"
      margin="10px auto 20px auto"
      sand
    >
      <FlagContainer marginRight="35px">
        <Flag src={flag} alt="flag" />
      </FlagContainer>
      <H3 margin="0" textAlign="left" fontWeight="400" fontSize="19px" sand>
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
