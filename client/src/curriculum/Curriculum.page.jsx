import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ThemeLessonsNumber from "../components/curriculum/ThemeLessonsNumber.component";
import GreenLessons from "../components/curriculum/GreenLessons.component";
import GoldLessons from "../components/curriculum/GoldLesson.component";
import { LanguageContext } from "../contexts/language-context";
import themes from "../exercises/themes";
import WeakWords from "../components/common/WeakWords.component";
import Navbar from "../home/Home.navbar";
import "../styles/Curriculum.scss";
import AppContainer from "../app/AppContainer.styled";
import H2 from "../components/texts/H2.styled";
import H3 from "../components/texts/H3.styled";
import VerticalFlexbox from "../components/div/VerticalFlexbox.styled";
import CardsContainer from "../cards/CardsContainer.styled";
import Card from "../cards/Card.styled";

const mapStateToProps = state => ({ user: state.user });

const Curriculum = props => {
  const { user } = props;
  const language = useContext(LanguageContext);
  const { curriculum } = language;
  let areWeakWordsLaunchable = false;

  // TODO :render cards only after the database call if user is logged in ?
  if (user.isAuthenticated && user.stats.globalProgress.studiedLessons > 5) {
    areWeakWordsLaunchable = true;
  }

  // TODO: rename theme in topic
  // lesson name, words/theme, lessons/theme
  const cards = themes.map(val => {
    let greenLessons = 0;
    let goldLessons = 0;
    let lessons = val[2];
    let borderColor = "";

    if (user.isAuthenticated && user.stats.themes[val[0]]) {
      greenLessons = user.stats.themes[val[0]].green;
      goldLessons = user.stats.themes[val[0]].gold;
      lessons -= greenLessons;
      lessons -= goldLessons;
    }
    if (lessons === 0) {
      borderColor = greenLessons === 0 ? "gold" : "green";
    } else {
      borderColor = "darkBlue";
    }

    return (
      <Link key={val[0]} to={`../${val[0]}`}>
        <Card borderColor={borderColor}>
          <H3 fontWeight="400">{language.themes[val[0]]}</H3>
          <div className="lessonsStats">
            {lessons > 0 && <ThemeLessonsNumber lessons={lessons} />}
            {user.stats.themes && greenLessons > 0 && (
              <GreenLessons greenLessons={greenLessons} />
            )}
            {user.stats.themes && goldLessons > 0 && (
              <GoldLessons goldLessons={goldLessons} />
            )}
          </div>
        </Card>
      </Link>
    );
  });

  return (
    <AppContainer withNavbar>
      <Navbar />
      <VerticalFlexbox margin="0 auto 50px auto">
        <H2 margin="30px 0 30px 0">{curriculum.title}</H2>
        {areWeakWordsLaunchable && <WeakWords reference="curriculum" />}
        <CardsContainer>{cards}</CardsContainer>
      </VerticalFlexbox>
    </AppContainer>
  );
};

Curriculum.propTypes = {
  user: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    stats: PropTypes.shape({
      themes: PropTypes.object,
      globalProgress: PropTypes.shape({
        studiedLessons: PropTypes.number.isRequired,
      }),
    }),
  }).isRequired,
};

export default connect(
  mapStateToProps,
  null
)(Curriculum);
