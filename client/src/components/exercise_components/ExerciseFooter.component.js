import React from "react";

const ExerciseFooter = function(props) {
  let footerClass = "";
  if (props.checking) {
    if (props.correctAnswer) {
      footerClass = "exercise-footer-correct";
    } else {
      footerClass = "exercise-footer-incorrect";
    }
  }

  return <div className={"exercise-footer " + footerClass} />;
};

export default ExerciseFooter;
