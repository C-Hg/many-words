import React from "react";
import { ArrowRight } from "styled-icons/evil";

import IconButton from "../../components/buttons/IconButton.styled";

type Props = {
  arrowColor: string;
  onClick: () => void;
};

const ContinueButton = (props: Props) => {
  const { onClick, arrowColor } = props;

  return (
    <IconButton right="20px" onClick={onClick} color={arrowColor} type="button">
      <ArrowRight size="60px" />
    </IconButton>
  );
};

export default ContinueButton;
