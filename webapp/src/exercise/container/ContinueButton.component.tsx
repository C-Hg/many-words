import React from "react";
import { ArrowRight } from "styled-icons/evil";

import StyledContinueButton from "./styled/ContinueButton.styled";

type Props = {
  arrowColor: string;
  onClick: () => void;
};

const ContinueButton = (props: Props) => {
  const { onClick, arrowColor } = props;

  return (
    <StyledContinueButton onClick={onClick} color={arrowColor} type="button">
      <ArrowRight size="60px" />
    </StyledContinueButton>
  );
};

export default ContinueButton;
