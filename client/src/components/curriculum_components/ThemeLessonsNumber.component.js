import React from "react";

function ThemeLessonsNumber(props) {
  return (
    <div className="cardColumn">
      <i
        alt="Back"
        className="material-icons md-48 assignments  lessonsStatsIcon"
      >
        description
      </i>
      <div className="cardNumbers">{props.lessons}</div>
    </div>
  );
}

export default ThemeLessonsNumber;
