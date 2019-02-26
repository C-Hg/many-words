import React from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../contexts/language-context";
import { UserContext } from "../contexts/user-context";
import "./styles/Curriculum.scss";

import ThemeTitle from "./curriculum_components/ThemeTitle.component";
import getThemesStats from "../controllers/progress_tracking/getThemesStats.function";
import ThemeLessonsNumber from "./curriculum_components/ThemeLessonsNumber.component";
import GreenLessons from "./curriculum_components/GreenLessons.component";
import GoldLessons from "./curriculum_components/GoldLesson.component";

import themes from "../exercises/themes";

class Curriculum extends React.Component {
  constructor(props) {
    super(props);
    this.fetchThemesStats = this.fetchThemesStats.bind(this);
    this.state = {
      userStats: "",
      areStatsChecked: false
    };
  }

  async fetchThemesStats() {
    let userStats = await getThemesStats();
    if (userStats.response === "No data for this user") {
      userStats = false;
    }
    this.setState({
      userStats: userStats,
      areStatsChecked: true
    });
  }

  componentDidMount() {
    let user = this.context;
    if (user.isAuthenticated) {
      this.fetchThemesStats();
    }
  }

  render() {
    let user = this.context;

    // lesson name, words/theme, lessons/theme
    const cards = themes.map(val => {
      let greenLessons = 0;
      let goldLessons = 0;
      let lessons = val[2];
      let borderColorClass = "";

      // depends on api call
      if (this.state.userStats[val[0]]) {
        greenLessons = this.state.userStats[val[0]].green;
        goldLessons = this.state.userStats[val[0]].gold;
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
          <ThemeTitle theme={val[0]} />
          {lessons > 0 && <ThemeLessonsNumber lessons={lessons} />}
          {this.state.userStats && greenLessons > 0 && (
            <GreenLessons green={greenLessons} />
          )}
          {this.state.userStats && goldLessons > 0 && (
            <GoldLessons gold={goldLessons} />
          )}
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
