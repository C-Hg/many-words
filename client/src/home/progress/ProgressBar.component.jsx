import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Container from "../../components/div/Container.styled";
import EmptyBar from "./EmptyBar.styled";
import FilledBar from "./FilledBar.styled";

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
    <Container width="330px">
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
    </Container>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.string.isRequired,
};

export default ProgressBar;
