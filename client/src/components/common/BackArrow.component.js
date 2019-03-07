import React from "react";

const BackArrow = function(props) {
  return (
    <i
      alt="Back"
      className={`material-icons md-60 backArrow ${props.additionalClass ||
        ""}`}
    >
      arrow_back
    </i>
  );
};

export default BackArrow;
