import React from "react";

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

export default BackArrow;
