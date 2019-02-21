import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/user-context";
import { getLessons } from "../controllers/getLessons.function";
import getLessonsStats from "../controllers/progress_tracking/getLessonsStats.function";

import "./styles/Theme.scss";

import BackArrow from "./common_components/BackArrow.component";
import ProgressCircle from "./theme_components/ProgressCircle.component";
import StartTestButton from "./theme_components/StartTestButton.component";
import LearnWordsButton from "./theme_components/LearnWordsButton.component";
import LessonTitle from "./theme_components/LessonTitle.component";
import ThemePageTitle from "./theme_components/ThemePageTitle.component";
import ProgressPercentage from "./theme_components/ProgressPercentage.component";
import GoldStar from "./theme_components/GoldStar.component";
import ScrollToTopOnMount from "../router/ScrollToTopOnMount.component";

class Theme extends React.Component {
  constructor(props) {
    super(props);
    this.fetchLessonsStats = this.fetchLessonsStats.bind(this);
    this.state = {
      lessonsStats: ""
    };
  }

  async fetchLessonsStats() {
    let lessonsStats = await getLessonsStats(this.props.theme);
    this.setState({
      lessonsStats: lessonsStats
    });
  }

  componentDidMount() {
    let user = this.context;
    if (user.isAuthenticated) {
      this.fetchLessonsStats();
    }
  }

  render() {
    /* ----------------       preparing data    -------------- */
    let user = this.context;
    let theme = this.props.theme;
    let lessonsData = getLessons(theme);
    let progressColor = "";

    //map for each lesson of the theme
    const lessons = lessonsData.map(val => {
      let progress = this.state.lessonsStats
        ? this.state.lessonsStats[val[0]]
        : null;
      if (progress > 0.8) {
        progressColor = "gold";
      } else if (progress > 0.2) {
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
    if (!user.isAuthenticated || lessonsData) {
      return (
        <div className="greyBackground">
          <ScrollToTopOnMount />
          <div className="themeAndArrow">
            <Link to={`/curriculum`}>
              <BackArrow additionalClass="themePageArrow" />
            </Link>
            <ThemePageTitle theme={theme} />
          </div>
          <div className="lessonCards">{lessons}</div>
        </div>
      );
    }
  }
}

Theme.contextType = UserContext;

export default Theme;
