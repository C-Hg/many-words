import React from "react";
import PropTypes from "prop-types";

const SVGCircle = props => {
  const { strokeDashoffset, style } = props;
  return (
    <div>
      <svg height="100" width="100" strokeDashoffset={strokeDashoffset}>
        <circle cx="50" cy="50" r="40" className="greyCircle" />
        <circle
          cx="50"
          cy="50"
          r="40"
          transform="rotate(-90 50 50)"
          className={style}
        />
      </svg>
    </div>
  );
};

SVGCircle.propTypes = {
  strokeDashoffset: PropTypes.number.isRequired,
  style: PropTypes.string.isRequired,
};

export default SVGCircle;
