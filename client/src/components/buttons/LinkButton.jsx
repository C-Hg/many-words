import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import DefaultButton from "./DefaultButton.styled";

const LinkButton = props => {
  const { title, to } = props;
  return (
    <Link to={to} type="button">
      <DefaultButton>{title}</DefaultButton>
    </Link>
  );
};

LinkButton.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default LinkButton;
