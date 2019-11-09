import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ProgressBar = props => {
  const [isBarVisible, setIsBarVisible] = useState(false);
  const { progress } = props; // from 0 to 1

  const delayBarApparition = () => {
    setIsBarVisible(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => delayBarApparition(), 450);
    return () => clearTimeout(timer);
  }, []);

  let strokeDashoffset = 300;

  if (progress && isBarVisible) {
    strokeDashoffset = 300 - 300 * Number(progress);
  }

  return (
    <div className="barsContainer">
      <svg
        width="350"
        height="40"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        strokeDashoffset={strokeDashoffset}
      >
        <line
          x1="15"
          x2="315"
          y1="15"
          y2="15"
          className="progressBar emptyBar"
        />
        <line
          x1="15"
          x2="315"
          y1="15"
          y2="15"
          className="progressBar filledBar"
        />
      </svg>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default ProgressBar;
