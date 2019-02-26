import React from "react";
import { LanguageContext } from "../../../contexts/language-context";
import ProgressBar from "./ProgressBar.component";
import WordProgress from "./WordProgress.component";
import { calculateLessonsStats } from "../../../controllers/progress_tracking/calculateLessonsStats.function";
import LessonProgress from "./LessonProgress.component";

function GlobalProgress(props) {
  let progress = props.stats.globalProgress.globalPercentage;
  let wordStats = props.stats.globalProgress;
  let lessonStats = calculateLessonsStats(
    props.stats.lessonsStats,
    props.stats.themesStats
  );

  return (
    <LanguageContext.Consumer>
      {({ home }) => (
        <div className="globalProgress">
          <h1 className="menuTitle globalProgressTitle">
            {home.progress_title}
          </h1>
          <ProgressBar progress={progress} />
          <div className="wordAndLessonProgress">
            <WordProgress wordStats={wordStats} />
            <LessonProgress lessonStats={lessonStats} />
          </div>
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default GlobalProgress;
