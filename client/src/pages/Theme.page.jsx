import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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
import ScrollToTopOnMount from "../app/ScrollToTopOnMount.component";
import frenchEnglishLessons from "../exercises/lessons";
import WeakWords from "../components/common/WeakWords.component";
import Navbar from "../components/navbar/Navbar.component";

const mapStateToProps = state => ({ user: state.user });

const Theme = props => {
  /* ----------------       preparing data    -------------- */
  const { user, match } = props;
  const { stats, isAuthenticated } = user;
  const theme = match.params.themeId;
  let lessonsStats = null;
  const lessonsData = frenchEnglishLessons[theme];
  let isWeakWordsModeLaunchable = false;
  if (stats.lessons && stats.lessons[theme]) {
    lessonsStats = stats.lessons[theme];
    isWeakWordsModeLaunchable = true;
  }

  // map for each lesson of the theme
  const lessons = lessonsData.map(val => {
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
          <StartTestButton match={match} lesson={val[0]} theme={theme} />
          <LearnWordsButton match={match} lesson={val[0]} />
        </div>
      </div>
    );
  });

  /* -----------------    rendering component     -----------------  */
  if (lessons || !isAuthenticated) {
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
          {isAuthenticated && isWeakWordsModeLaunchable && (
            <WeakWords reference={theme} />
          )}
          <div className="lessonCards">{lessons}</div>
        </div>
      </div>
    );
  }
  return null;
};

Theme.propTypes = {
  user: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    stats: PropTypes.shape({
      lessons: PropTypes.object,
    }),
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      themeId: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default connect(
  mapStateToProps,
  null
)(Theme);
