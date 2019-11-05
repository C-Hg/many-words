import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function mapStateToProps(state) {
  return { user: state.user };
}

const ProgressBar = props => {
  const [isBarVisible, setIsBarVisible] = useState(false);
  const { user } = props;

  const delayBarApparition = () => {
    setIsBarVisible(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => delayBarApparition(), 450);
    return () => clearTimeout(timer);
  }, []);

  const progress = user.stats.globalProgress.globalPercentage; // from 0 to 1 or falsy
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
  user: PropTypes.shape({
    stats: PropTypes.shape({
      globalProgress: PropTypes.shape({
        globalPercentage: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
};

export default connect(
  mapStateToProps,
  null
)(ProgressBar);
