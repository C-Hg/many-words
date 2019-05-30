import React from "react";
import { LanguageContext } from "../../../contexts/language-context";
import { Link } from "react-router-dom";

function ResumeLearning() {
  return (
    <LanguageContext.Consumer>
      {({ home }) => (
        <Link to={"/curriculum"} className="resumeLearningButton">
          {home.resume_learning}
        </Link>
      )}
    </LanguageContext.Consumer>
  );
}

export default ResumeLearning;
