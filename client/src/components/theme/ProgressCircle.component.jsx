import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import SVGCircle from "./SVGCircle.component";

const ProgressCircle = props => {
  const [isCircleVisible, setIsCircleVisible] = useState(false);

  const delayCircleApparition = () => {
    setIsCircleVisible(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => delayCircleApparition(), 450);
    return () => clearTimeout(timer);
  }, []);

  const { progress, progressColor } = props; // from 0 to 1 or falsy
  const progressStyle = isCircleVisible ? "progressCircle" : "";
  let strokeColor = "greyCircle";
  let strokeDashoffset = 251.5;

  if (progress && isCircleVisible) {
    strokeColor = `${progressColor}Stroke`;
    strokeDashoffset = 251.5 - 251.5 * progress;
  }

  return (
    <div className="circleContainer">
      <SVGCircle
        strokeDashoffset={`${strokeDashoffset}px`}
        style={`${progressStyle} ${strokeColor}`}
      />
    </div>
  );
};

ProgressCircle.propTypes = {
  progress: PropTypes.number,
  progressColor: PropTypes.string,
};

ProgressCircle.defaultProps = {
  progress: 0,
  progressColor: undefined,
};

export default ProgressCircle;
