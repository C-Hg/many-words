import React from "react";
import { LanguageContext } from "../../../contexts/language-context";
import ProgressBar from "./ProgressBar.component";
import WordProgress from "./WordProgress.component";
import LessonProgress from "./LessonProgress.component";

const GlobalProgress = () => {
  return (
    <LanguageContext.Consumer>
      {({ home }) => (
        <div className="globalProgress">
          <h1 className="menuTitle globalProgressTitle">
            {home.progress_title}
          </h1>
          <ProgressBar />
          <div className="wordAndLessonProgress">
            <WordProgress />
            <LessonProgress />
          </div>
        </div>
      )}
    </LanguageContext.Consumer>
  );
};

export default GlobalProgress;
