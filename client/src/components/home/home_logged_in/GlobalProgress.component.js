import React from "react";
import { LanguageContext } from "../../../contexts/language-context";
import ProgressBar from "./ProgressBar.component";
import WordProgress from "./WordProgress.component";
import LessonProgress from "./LessonProgress.component";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return { user: state.user };
}

function GlobalProgress(props) {
  let progress = props.stats.globalProgress.globalPercentage;
  let wordStats = props.stats.globalProgress;
  let lessonStats = props.user.stats.lessonsStats;

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

export default connect(
  mapStateToProps,
  null
)(GlobalProgress);
