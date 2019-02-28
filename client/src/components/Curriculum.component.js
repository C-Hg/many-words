import React from "react";
import { Link, Redirect } from "react-router-dom";
import { LanguageContext } from "../contexts/language-context";
import { UserContext, user } from "../contexts/user-context";
import "./styles/Curriculum.scss";

import ThemeTitle from "./curriculum_components/ThemeTitle.component";
import getUserStats from "../controllers/progress_tracking/getUserStats.function";
import ThemeLessonsNumber from "./curriculum_components/ThemeLessonsNumber.component";
import GreenLessons from "./curriculum_components/GreenLessons.component";
import GoldLessons from "./curriculum_components/GoldLesson.component";

import themes from "../exercises/themes";
import WeakWords from "./common_components/WeakWords.component";

class Curriculum extends React.Component {
  constructor(props) {
    super(props);
    this.fetchUserStats = this.fetchUserStats.bind(this);
    this.state = {
      themesStats: "",
      lessonsStats: {},
      areStatsChecked: false
    };
  }

  // uses UserContext as a cache for user Stats, refreshes only after an exercise is finished
  async fetchUserStats(currentUser) {
    if (currentUser.areStatsValid) {
      this.setState({
        themesStats: currentUser.stats.themesStats,
        lessonsStats: currentUser.stats.lessonsStats,
        areStatsChecked: true
      });
    } else {
      let stats = await getUserStats();
      if (stats.themesStats === {}) {
        stats.themesStats = false;
      }
      this.setState({
        themesStats: stats.themesStats,
        lessonsStats: stats.lessonsStats,
        areStatsChecked: true
      });
      user.updateUserStats(stats);
    }
  }

  componentDidMount() {
    let currentUser = this.context;
    if (currentUser.isAuthenticated) {
      this.fetchUserStats(currentUser);
    }
  }

  render() {
    let user = this.context;
    if (user.isAuthenticated && user.activity === "weak_words") {
      return <Redirect to="/weak_words" />;
    }
    // lesson name, words/theme, lessons/theme
    const cards = themes.map(val => {
      let greenLessons = 0;
      let goldLessons = 0;
      let lessons = val[2];
      let borderColorClass = "";

      // depends on api call
      if (this.state.themesStats[val[0]]) {
        greenLessons = this.state.themesStats[val[0]].green;
        goldLessons = this.state.themesStats[val[0]].gold;
        lessons -= greenLessons;
        lessons -= goldLessons;
      }
      if (lessons === 0) {
        if (greenLessons === 0) {
          borderColorClass = "goldBorder";
        } else {
          borderColorClass = "greenBorder";
        }
      } else {
        borderColorClass = "blueBorder";
      }

      return (
        <Link
          className={`themeCard ${borderColorClass}`}
          key={val[0]}
          to={`../${val[0]}`}
        >
          <div className="themeTitleContainer">
            <ThemeTitle theme={val[0]} />
          </div>
          <div className="lessonsStats">
            {lessons > 0 && <ThemeLessonsNumber lessons={lessons} />}
            {this.state.themesStats && greenLessons > 0 && (
              <GreenLessons green={greenLessons} />
            )}
            {this.state.themesStats && goldLessons > 0 && (
              <GoldLessons gold={goldLessons} />
            )}
          </div>
        </Link>
      );
    });

    // render cards only after the database call if user is logged in
    if (this.state.areStatsChecked || !user.isAuthenticated) {
      return (
        <LanguageContext.Consumer>
          {({ curriculum }) => (
            <div className="curriculum greyBackground">
              <h1 className="menuTitle">{curriculum.title}</h1>
              {user.isAuthenticated && this.state.lessonsStats && (
                <WeakWords
                  context="global"
                  reference={null}
                  startWeakWords={this.props.startWeakWords}
                />
              )}
              <div className="themeCards">{cards}</div>
            </div>
          )}
        </LanguageContext.Consumer>
      );
    }

    return null;
  }
}

Curriculum.contextType = UserContext;

export default Curriculum;
