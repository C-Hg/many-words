import React from "react";
import PropTypes from "prop-types";

const ThemeLessonsNumber = props => {
  const { lessons } = props;
  return (
    <div className="cardColumn">
      <i
        alt="Back"
        className="material-icons md-48 assignments  lessonsStatsIcon"
      >
        description
      </i>
      <div className="cardNumbers">{lessons}</div>
    </div>
  );
};

ThemeLessonsNumber.propTypes = {
  lessons: PropTypes.number.isRequired,
};

export default ThemeLessonsNumber;
