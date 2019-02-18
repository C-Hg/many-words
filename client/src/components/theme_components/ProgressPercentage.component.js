import React from "react";

function ProgressPercentage(props) {
  return (
    <div className="progressPercentage circleStats">
      {Math.floor(props.progress * 100)}
    </div>
  );
}

export default ProgressPercentage;
