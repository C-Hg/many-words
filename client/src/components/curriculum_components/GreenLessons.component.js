import React from "react";

function GreenLessons(props) {
  return (
    <div className="cardLine">
      <i alt="Back" className="material-icons md-48 greenLessonsIcon">
        check_circle_outline
      </i>
      <div className="cardNumbers">{props.green}</div>
    </div>
  );
}

export default GreenLessons;
