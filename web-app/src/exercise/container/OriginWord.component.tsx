import React from "react";

import InnerContainer from "./styled/InnerContainer.styled";

import FlagContainer from "../../components/div/FlagContainer.styled";
import Flag from "../../components/images/Flag.styled";
import H3 from "../../components/texts/H3.styled";
import frenchFlag from "../../images/flags/France.png";
import ukFlag from "../../images/flags/UK.png";

// TODO: update selectedForm data structure
const OriginWord = (props) => {
  const { exercise } = props;
  const { words, wordRank } = exercise;
  const word = words[wordRank][words[wordRank].selectedForm[1]];
  const language = words[wordRank].selectedForm[1];
  const flag = language === "fr" ? frenchFlag : ukFlag;

  return (
    <InnerContainer height="30px" margin="16px auto" sand>
      <FlagContainer marginRight="35px">
        <Flag src={flag} alt="flag" />
      </FlagContainer>
      <H3 margin="0" textAlign="left" fontWeight="400" fontSize="19px" sand>
        {word}
      </H3>
    </InnerContainer>
  );
};

export default OriginWord;
