import React from "react";

function ThemeLessonsNumber(props) {
  return (
    <div className="cardLine">
      <i alt="Back" className="material-icons md-48 assignments">
        description
      </i>
      <div className="cardNumbers">{props.lessons}</div>
    </div>
  );
}

export default ThemeLessonsNumber;
