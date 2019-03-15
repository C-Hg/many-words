import React from "react";
import { Link, Redirect } from "react-router-dom";
import getUserStats from "../controllers/progress_tracking/getUserStats.function";
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

function mapStateToProps(state) {
  return { user: state.user };
}

const mapDispatchToProps = dispatch => {
  return {};
};

class Theme extends React.Component {
  constructor(props) {
    super(props);
    this.fetchUserStats = this.fetchUserStats.bind(this);
    this.state = {
      lessonsStats: "",
      areStatsChecked: false
    };
  }

  async fetchUserStats(user) {
    if (user.areStatsValid) {
      this.setState({
        lessonsStats: user.stats.lessonsStats[this.props.theme],
        areStatsChecked: true
      });
    } else {
      let userStats = await getUserStats(this.props.theme);
      this.setState({
        lessonsStats: userStats.lessonsStats[this.props.theme],
        areStatsChecked: true
      });
      user.updateUserStats(userStats);
    }
  }

  componentDidMount() {
    let user = this.context;
    if (user.isAuthenticated) {
      this.fetchUserStats(user);
    }
  }

  render() {
    /* ----------------       preparing data    -------------- */
    let user = this.props.user;
    let theme = this.props.theme;
    let lessonsData = FR_EN_Lessons[theme];
    let progressColor = "";

    //map for each lesson of the theme
    const lessons = lessonsData.map(val => {
      let progress = this.state.lessonsStats
        ? this.state.lessonsStats[val[0]]
        : null;
      if (progress >= 0.8) {
        progressColor = "gold";
      } else if (progress >= 0.4) {
        progressColor = "green";
      } else progressColor = "blue";

      return (
        <div className={`lessonCard ${progressColor}Border`} key={val[0]}>
          <LessonTitle lesson={val[0]} theme={theme} />
          <ProgressCircle progress={progress} progressColor={progressColor} />
          <ProgressPercentage
            progress={progress}
            progressColor={progressColor}
          />
          <GoldStar progress={progress} />
          <div className="themeButtons">
            <StartTestButton {...this.props} lesson={val[0]} />
            <LearnWordsButton {...this.props} lesson={val[0]} />
          </div>
        </div>
      );
    });

    /* -----------------    rendering component     -----------------  */
    if (user.isAuthenticated && user.activity === "weak_words") {
      return <Redirect to="/weak_words" />;
    }
    if (this.state.areStatsChecked || !user.isAuthenticated) {
      return (
        <div className="main-container greyBackground">
          <ScrollToTopOnMount />
          <div className="themeAndArrow">
            <Link to={`/curriculum`}>
              <BackArrow additionalClass="themePageArrow" />
            </Link>
            <ThemePageTitle theme={theme} />
          </div>
          {user.isAuthenticated && this.state.lessonsStats && (
            <WeakWords
              context="theme"
              reference={this.props.theme}
              startWeakWords={this.props.startWeakWords}
            />
          )}
          <div className="lessonCards">{lessons}</div>
        </div>
      );
    } else return null;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Theme);
