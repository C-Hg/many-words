import React from "react";

function ProgressPercentage(props) {
  if (props.progress === 1 || !props.progress) {
    return <div className="progressPercentage circleStats">{""}</div>;
  }
  return (
    <div className="progressPercentage circleStats">
      {Math.floor(props.progress * 100)}
    </div>
  );
}

export default ProgressPercentage;

/*
NB: returns a void value to avoid a strange shift that occurs 
if this component renders null at first then a value
*/
