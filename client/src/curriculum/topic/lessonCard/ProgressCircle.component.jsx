import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import GreyCircle from "./styled/GreyCircle.styled";
import ColoredCircle from "./styled/ColoredCircle.styled";
import Centered from "../../../components/div/Centered.styled";
import ProgressPercentage from "./styled/ProgressPercentage.styled";

const ProgressCircle = props => {
  const { progress, color } = props; // from 0 to 1 or falsy
  const [isCircleVisible, setIsCircleVisible] = useState(false);

  const delayCircleApparition = () => {
    setIsCircleVisible(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => delayCircleApparition(), 450);
    return () => clearTimeout(timer);
  }, []);

  let strokeDashoffset = 251.5;
  if (progress && isCircleVisible) {
    strokeDashoffset = `${251.5 - 251.5 * progress}px`;
  }

  const shouldDisplayCircle = isCircleVisible && progress > 0;
  const shouldDisplayPercentage = progress > 0 && progress < 1;
  return (
    <Centered>
      <svg height="100" width="100" strokeDashoffset={strokeDashoffset}>
        <GreyCircle cx="50" cy="50" r="40" />
        {shouldDisplayCircle && (
          <ColoredCircle
            cx="50"
            cy="50"
            r="40"
            transform="rotate(-90 50 50)"
            color={color}
          />
        )}
        {shouldDisplayPercentage && (
          <ProgressPercentage x="41" y="55">
            {Math.floor(progress * 100)}
          </ProgressPercentage>
        )}
      </svg>
    </Centered>
  );
};

ProgressCircle.propTypes = {
  progress: PropTypes.number,
  color: PropTypes.string,
};

ProgressCircle.defaultProps = {
  progress: 0,
  color: undefined,
};

export default ProgressCircle;