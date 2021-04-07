import React, { useState, useEffect } from "react";

import EmptyBar from "./styled/EmptyBar.styled";
import FilledBar from "./styled/FilledBar.styled";
import ProgressBarContainer from "./styled/ProgressBarContainer.styled";

type Props = {
  progress: number;
};

const ProgressBar = (props: Props) => {
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
    strokeDashoffset = 300 - 300 * progress;
  }

  return (
    <ProgressBarContainer>
      <svg
        width="350"
        height="40"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        strokeDashoffset={strokeDashoffset}
      >
        <EmptyBar x1="15" x2="315" y1="15" y2="15" />
        <FilledBar x1="15" x2="315" y1="15" y2="15" />
      </svg>
    </ProgressBarContainer>
  );
};

export default ProgressBar;
