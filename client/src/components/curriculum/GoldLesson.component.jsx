import React from "react";
import PropTypes from "prop-types";

const GoldLessons = props => {
  const { goldLessons } = props;
  return (
    <div className="cardColumn">
      <i
        alt="Back"
        className="material-icons md-48 goldLessonsIcon  lessonsStatsIcon"
      >
        grade
      </i>
      <div className="cardNumbers">{goldLessons}</div>
    </div>
  );
};

GoldLessons.propTypes = {
  goldLessons: PropTypes.number.isRequired,
};

export default GoldLessons;
