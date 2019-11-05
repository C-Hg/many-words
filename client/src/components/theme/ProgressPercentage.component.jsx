import React from "react";
import PropTypes from "prop-types";

const ProgressPercentage = props => {
  const { progress } = props;
  if (progress === 1 || !progress) {
    // do not display progress number
    return <div className="progressPercentage circleStats"></div>;
  }
  return (
    <div className="progressPercentage circleStats">
      {Math.floor(progress * 100)}
    </div>
  );
};

ProgressPercentage.propTypes = {
  progress: PropTypes.number,
};

ProgressPercentage.defaultProps = {
  progress: 0,
};

export default ProgressPercentage;

/*
NB: returns a void value to avoid a strange shift that occurs 
if this component renders null at first then a value
*/
