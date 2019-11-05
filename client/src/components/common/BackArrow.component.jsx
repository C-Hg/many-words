import React from "react";
import PropTypes from "prop-types";

// TODO: use className
const BackArrow = props => {
  const { additionalClass } = props;
  return (
    <i
      alt="Back"
      className={`material-icons md-60 backArrow ${additionalClass || ""}
        `}
    >
      arrow_back
    </i>
  );
};

BackArrow.propTypes = {
  additionalClass: PropTypes.string,
};

BackArrow.defaultProps = {
  additionalClass: "",
};

export default BackArrow;
