import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import frenchFlag from "../../images/flags/France.png";
import ukFlag from "../../images/flags/UK.png";
import FlagContainer from "../../components/div/FlagContainer.styled";
import Flag from "../../components/images/Flag.styled";
import H3 from "../../components/texts/H3.styled";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import InnerContainer from "./InnerContainer.styled";

const mapStateToProps = state => ({ exercise: state.exercise });

// TODO: update selectedForm data structure
const OriginWord = props => {
  const { exercise } = props;
  const { words, wordRank } = exercise;
  const word = words[wordRank][words[wordRank].selectedForm[1]];
  const language = words[wordRank].selectedForm[1];
  const flag = language === "fr" ? frenchFlag : ukFlag;
  const { width: screenWidth } = useWindowDimensions();

  return (
    <InnerContainer
      height="30px"
      margin="16px auto"
      screenWidth={screenWidth}
      sand
    >
      <FlagContainer marginRight="35px">
        <Flag src={flag} alt="flag" />
      </FlagContainer>
      <H3 margin="0" textAlign="left" fontWeight="400" fontSize="19px" sand>
        {word}
      </H3>
    </InnerContainer>
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
