import React from "react";
import PropTypes from "prop-types";

const GreenLessons = props => {
  const { greenLessons } = props;
  return (
    <div className="cardColumn">
      <i
        alt="Back"
        className="material-icons md-48 greenLessonsIcon lessonsStatsIcon"
      >
        check_circle_outline
      </i>
      <div className="cardNumbers">{greenLessons}</div>
    </div>
  );
};

GreenLessons.propTypes = {
  greenLessons: PropTypes.number.isRequired,
};

export default GreenLessons;
