import React from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../contexts/language-context";
import "../styles/Curriculum.scss";

import { connect } from "react-redux";

import ThemeTitle from "../components/curriculum/ThemeTitle.component";
import ThemeLessonsNumber from "../components/curriculum/ThemeLessonsNumber.component";
import GreenLessons from "../components/curriculum/GreenLessons.component";
import GoldLessons from "../components/curriculum/GoldLesson.component";

import themes from "../exercises/themes";
import WeakWords from "../components/common/WeakWords.component";
import Navbar from "../components/navbar/Navbar.component";

function mapStateToProps(state) {
  return { user: state.user };
}

class Curriculum extends React.Component {
  render() {
    const { user } = this.props;
    let weak_words_launchable = false;

    // TO DO :render cards only after the database call if user is logged in ?
    if (user.isAuthenticated && user.stats.globalProgress.studiedLessons) {
      weak_words_launchable = true;
    }

    // lesson name, words/theme, lessons/theme
    const cards = themes.map(val => {
      let greenLessons = 0;
      let goldLessons = 0;
      let lessons = val[2];
      let borderColorClass = "";

      if (user.isAuthenticated && user.stats.themes[val[0]]) {
        greenLessons = user.stats.themes[val[0]].green;
        goldLessons = user.stats.themes[val[0]].gold;
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
            {user.stats.themes && greenLessons > 0 && (
              <GreenLessons greenLessons={greenLessons} />
            )}
            {user.stats.themes && goldLessons > 0 && (
              <GoldLessons goldLessons={goldLessons} />
            )}
          </div>
        </Link>
      );
    });

    return (
      <LanguageContext.Consumer>
        {({ curriculum }) => (
          <div className="app app-with-navbar-full-screen">
            <Navbar />
            <div className="main-container greyBackground">
              <div className="curriculum ">
                <h1 className="menuTitle">{curriculum.title}</h1>
                {weak_words_launchable && <WeakWords reference="curriculum" />}
                <div className="themeCards">{cards}</div>
              </div>
            </div>
          </div>
        )}
      </LanguageContext.Consumer>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(Curriculum);
