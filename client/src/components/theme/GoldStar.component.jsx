import React from "react";
import PropTypes from "prop-types";

function GoldStar(props) {
  const { progress } = props;
  if (progress === 1) {
    return (
      <div className="goldStar circleStats">
        <i alt="Back" className="material-icons md-60 goldLessonsIcon">
          grade
        </i>
      </div>
    );
  }
  // placeholder to prevent shift on loading
  return (
    <div className="goldStar circleStats">
      <i alt="Back" className="material-icons md-60 goldLessonsIcon" />
    </div>
  );
}

GoldStar.propTypes = {
  progress: PropTypes.number
};

export default GoldStar;
