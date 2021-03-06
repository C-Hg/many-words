import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "../styles/Theme.scss";
import "../styles/common/titles.scss";

import BackArrow from "../components/common/BackArrow.component";
import ProgressCircle from "../components/theme/ProgressCircle.component";
import StartTestButton from "../components/theme/StartTestButton.component";
import LearnWordsButton from "../components/theme/LearnWordsButton.component";
import LessonTitle from "../components/theme/LessonTitle.component";
import ThemePageTitle from "../components/theme/ThemePageTitle.component";
import ProgressPercentage from "../components/theme/ProgressPercentage.component";
import GoldStar from "../components/theme/GoldStar.component";
import ScrollToTopOnMount from "../router/ScrollToTopOnMount.component";

import FR_EN_Lessons from "../exercises/lessons";
import WeakWords from "../components/common/WeakWords.component";
import Navbar from "../components/navbar/Navbar.component";

function mapStateToProps(state) {
  return { user: state.user };
}

const Theme = props => {
  /* ----------------       preparing data    -------------- */
  const { user } = props;
  const theme = props.match.params.themeId;
  let lessonsStats = null;
  const lessonsData = FR_EN_Lessons[theme];
  let weak_words_launchable = false;
  let lessons = "";
  if (user.stats.lessons && user.stats.lessons[theme]) {
    lessonsStats = user.stats.lessons[theme];
    weak_words_launchable = true;
  }

  // map for each lesson of the theme
  lessons = lessonsData.map(val => {
    let progressColor = "";
    const progress = lessonsStats ? lessonsStats[val[0]] : null;
    if (progress >= 0.8) {
      progressColor = "gold";
    } else if (progress >= 0.4) {
      progressColor = "green";
    } else progressColor = "blue";

    return (
      <div className={`lessonCard ${progressColor}Border`} key={val[0]}>
        <LessonTitle lesson={val[0]} theme={theme} />
        <ProgressCircle progress={progress} progressColor={progressColor} />
        <ProgressPercentage progress={progress} progressColor={progressColor} />
        <GoldStar progress={progress} />
        <div className="themeButtons">
          <StartTestButton {...props} lesson={val[0]} theme={theme} />
          <LearnWordsButton {...props} lesson={val[0]} />
        </div>
      </div>
    );
  });

  /* -----------------    rendering component     -----------------  */
  if (lessons || !user.isAuthenticated) {
    return (
      <div className="app app-with-navbar-full-screen">
        <Navbar />
        <div className="main-container greyBackground">
          <ScrollToTopOnMount />
          <div className="themeAndArrow">
            <Link to="/curriculum">
              <BackArrow additionalClass="themePageArrow" />
            </Link>
            <ThemePageTitle theme={theme} />
          </div>
          {user.isAuthenticated && weak_words_launchable && (
            <WeakWords reference={theme} />
          )}
          <div className="lessonCards">{lessons}</div>
        </div>
      </div>
    );
  }
  return null;
};

export default connect(
  mapStateToProps,
  null
)(Theme);
