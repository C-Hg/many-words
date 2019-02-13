import React from "react";

function GoldLessons(props) {
  return (
    <div className="cardLine">
      <i alt="Back" className="material-icons md-48 goldLessonsIcon">
        grade
      </i>
      <div className="cardNumbers">{props.gold}</div>
    </div>
  );
}

export default GoldLessons;
