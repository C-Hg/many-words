import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import LessonsStats from "./LessonsStats.component";
import { LanguageContext } from "../contexts/language-context";
import themes from "../exercises/themes";
import WeakWords from "../components/common/WeakWords.component";
import Navbar from "../navbar/Main.navbar";
import AppContainer from "../app/AppContainer.styled";
import H2 from "../components/texts/H2.styled";
import H3 from "../components/texts/H3.styled";
import VerticalFlexbox from "../components/div/VerticalFlexbox.styled";
import CardsContainer from "../components/cards/CardsContainer.styled";
import Card from "../components/cards/Card.styled";
import HorizontalFlexbox from "../components/div/HorizontalFlexbox.styled";
import CONSTANTS from "../config/constants";

const { lessonTypes } = CONSTANTS;

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

  // TODO: rename theme in topic in the whole repo: theme is a reserved word for theming with styled-components
  // lesson name, words/theme, lessons/theme
  const cards = themes.map(val => {
    let greenLessons = 0;
    let goldLessons = 0;
    let lessons = val[2];
    let borderColor;

    // computes lessons numbers and border colors
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

    // TODO: move this card to its own component taking as props: val[0], borderColor, lessons
    return (
      <Link key={val[0]} to={`../${val[0]}`}>
        <Card borderColor={borderColor} width="140px" height="120px">
          <H3 margin="10px 0 0 0">{language.themes[val[0]]}</H3>
          <HorizontalFlexbox width="auto">
            {lessons > 0 && (
              <LessonsStats
                lessons={lessons}
                lessonType={lessonTypes.totalNumber}
              />
            )}
            {user.stats.themes && greenLessons > 0 && (
              <LessonsStats
                lessons={greenLessons}
                lessonType={lessonTypes.greenLessons}
              />
            )}
            {user.stats.themes && goldLessons > 0 && (
              <LessonsStats
                lessons={goldLessons}
                lessonType={lessonTypes.goldLessons}
              />
            )}
          </HorizontalFlexbox>
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
