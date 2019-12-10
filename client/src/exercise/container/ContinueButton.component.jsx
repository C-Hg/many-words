import React from "react";
import PropTypes from "prop-types";

import { ArrowRight } from "styled-icons/evil";
import IconButton from "../../components/buttons/IconButton.styled";

const ContinueButton = props => {
  const { onClick, arrowColor } = props;

  return (
    <IconButton right="20px" onClick={onClick} color={arrowColor} type="button">
      <ArrowRight size="60px" />
    </IconButton>
  );
};

ContinueButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  arrowColor: PropTypes.string.isRequired,
};

export default ContinueButton;
