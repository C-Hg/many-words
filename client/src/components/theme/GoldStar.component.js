import React from "react";

function GoldStar(props) {
  if (props.progress !== 1) {
    return (
      <div className="goldStar circleStats">
        <i alt="Back" className="material-icons md-60 goldLessonsIcon" />
      </div>
    );
    // placeholder to prevent shift on loading
  } else
    return (
      <div className="goldStar circleStats">
        <i alt="Back" className="material-icons md-60 goldLessonsIcon">
          grade
        </i>
      </div>
    );
}

export default GoldStar;
