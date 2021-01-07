import React from "react";

import InnerContainer from "./styled/InnerContainer.styled";

import FlagContainer from "../../components/div/FlagContainer.styled";
import Flag from "../../components/images/Flag.styled";
import H3 from "../../components/texts/H3.styled";
import { LANGUAGES } from "../../config/constants";
import frenchFlag from "../../images/flags/France.png";
import ukFlag from "../../images/flags/UK.png";

type Props = {
  language: LANGUAGES;
  wordToTranslate: string;
};

const OriginWord = (props: Props) => {
  const { language, wordToTranslate } = props;
  const flag = language === LANGUAGES.French ? frenchFlag : ukFlag;

  return (
    <InnerContainer height="30px" margin="16px auto" sand>
      <FlagContainer marginRight="35px">
        <Flag src={flag} alt="flag" />
      </FlagContainer>
      <H3 margin="0" textAlign="left" fontWeight="400" fontSize="19px" sand>
        {wordToTranslate}
      </H3>
    </InnerContainer>
  );
};

export default OriginWord;
