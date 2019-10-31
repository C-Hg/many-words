import React from "react";
import { Link } from "react-router-dom";

import { LanguageContext } from "../../../contexts/language-context";

const ResumeLearning = () => {
  return (
    <LanguageContext.Consumer>
      {({ home }) => (
        <Link to="/curriculum" className="resumeLearningButton">
          {home.resume_learning}
        </Link>
      )}
    </LanguageContext.Consumer>
  );
};

export default ResumeLearning;
