import React from "react";
import { Link, Redirect } from "react-router-dom";
import { LanguageContext } from "../contexts/language-context";
import "../styles/Curriculum.scss";

// import { actions as userActions } from "../redux/reducers/user";
import { connect } from "react-redux";

import ThemeTitle from "../components/curriculum/ThemeTitle.component";
import ThemeLessonsNumber from "../components/curriculum/ThemeLessonsNumber.component";
import GreenLessons from "../components/curriculum/GreenLessons.component";
import GoldLessons from "../components/curriculum/GoldLesson.component";

import themes from "../exercises/themes";
import WeakWords from "../components/common/WeakWords.component";

function mapStateToProps(state) {
  return { user: state.user };
}

// const mapDispatchToProps = dispatch => {
//   return {
//   };
// };

class Curriculum extends React.Component {
  render() {
    let user = this.props.user;
    let weak_words_launchable = false;

    // render cards only after the database call if user is logged in
    if (!user.stats.hasOwnProperty("themesStats") && user.isAuthenticated) {
      return null;
    }
    if (user.isAuthenticated && user.activity === "weak_words") {
      return <Redirect to="/weak_words" />;
    }
    // if (user.stats.globalProgress.studiedLessons) {
    //   weak_words_launchable = true;
    // }

    // lesson name, words/theme, lessons/theme
    const cards = themes.map(val => {
      let greenLessons = 0;
      let goldLessons = 0;
      let lessons = val[2];
      let borderColorClass = "";

      if (user.isAuthenticated && user.stats.themesStats[val[0]]) {
        greenLessons = user.stats.themesStats[val[0]].green;
        goldLessons = user.stats.themesStats[val[0]].gold;
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
            {user.stats.themesStats && greenLessons > 0 && (
              <GreenLessons green={greenLessons} />
            )}
            {user.stats.themesStats && goldLessons > 0 && (
              <GoldLessons gold={goldLessons} />
            )}
          </div>
        </Link>
      );
    });

    return (
      <LanguageContext.Consumer>
        {({ curriculum }) => (
          <div className="curriculum greyBackground">
            <h1 className="menuTitle">{curriculum.title}</h1>
            {weak_words_launchable && (
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
}

export default connect(
  mapStateToProps,
  null
)(Curriculum);
