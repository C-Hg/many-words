import React from "react";
import { Link } from "react-router-dom";
import { ArrowBack } from "styled-icons/material";
import PropTypes from "prop-types";

import GoBackButton from "./GoBackButton.styled";

const GoBack = props => {
  const { to } = props;

  return (
    <Link to={to}>
      <GoBackButton>
        <ArrowBack alt="go back" size="48" />
      </GoBackButton>
    </Link>
  );
};

GoBack.propTypes = {
  to: PropTypes.string.isRequired,
};

export default GoBack;