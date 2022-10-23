import React, { useContext } from "react";

import LessonCard from "./lessonCard/LessonCard.component";

import AppContainer from "../../app/AppContainer.styled";
import ScrollToTopOnMount from "../../app/ScrollToTopOnMount.component";
import GoBack from "../../components/buttons/GoBack/GoBack.component";
import CardsContainer from "../../components/cards/CardsContainer.styled";
import VerticalFlexbox from "../../components/div/VerticalFlexbox.styled";
import H2 from "../../components/texts/H2.styled";
import { LanguageContext } from "../../contexts/language-context";
import frenchEnglishLessons from "../../exercises/lessons";
import Navbar from "../../navbar/Main.navbar";
import WeakWords from "../WeakWords.component";

const Topic = (props) => {
  const language = useContext(LanguageContext);
  const { user, match } = props;
  const { stats, isAuthenticated } = user;
  const theme = match.params.themeId;

  /* ----------------       preparing data    -------------- */

  let lessonsStats = null;
  const lessonsData = frenchEnglishLessons[theme];
  let isWeakWordsModeLaunchable = false;
  if (stats.lessons && stats.lessons[theme]) {
    lessonsStats = stats.lessons[theme];
    isWeakWordsModeLaunchable = true;
  }

  // TODO: upgrade data structure: val[0] is not intelligible, use object instead
  // map each lesson of the theme
  const lessons = lessonsData.map((val) => {
    const lessonName = val[0];
    let progressColor = "darkBlue";
    const progress = lessonsStats ? lessonsStats[lessonName] : null;
    if (progress >= 0.8) {
      progressColor = "gold";
    } else if (progress >= 0.4) {
      progressColor = "green";
    }

    return (
      <LessonCard
        color={progressColor}
        theme={theme}
        lesson={lessonName}
        progress={progress}
        match={match}
        key={lessonName}
      />
    );
  });

  /* -----------------    rendering component     -----------------  */
  if (lessons || !isAuthenticated) {
    return (
      <AppContainer withNavbar sand>
        <Navbar />
        <ScrollToTopOnMount />
        <VerticalFlexbox margin="0 0 50px" sand>
          <GoBack to="/curriculum" />
          <H2 margin="30px 0 30px 0">{language.themes[theme]}</H2>
          <CardsContainer>{lessons}</CardsContainer>
          {isAuthenticated && isWeakWordsModeLaunchable && (
            <WeakWords reference={theme} />
          )}
        </VerticalFlexbox>
      </AppContainer>
    );
  }
  return null;
};

export default Topic;
