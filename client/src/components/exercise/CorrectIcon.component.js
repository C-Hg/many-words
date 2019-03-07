import React from "react";
import "../../common/material_icons.css";

const CorrectIcon = function(props) {
  if (props.checking && props.correctAnswer) {
    return (
      <div className="correctIcon">
        <i className="material-icons correct md-60">check_circle</i>
      </div>
    );
  } else return null;
};

export default CorrectIcon;
