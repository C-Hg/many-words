import React, { useContext } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./Theme.scss";

import ProgressCircle from "../../components/theme/ProgressCircle.component";
import StartTestButton from "../../components/theme/StartTestButton.component";
import LearnWordsButton from "../../components/theme/LearnWordsButton.component";
import ProgressPercentage from "../../components/theme/ProgressPercentage.component";
import GoldStar from "../../components/theme/GoldStar.component";
import ScrollToTopOnMount from "../../app/ScrollToTopOnMount.component";
import frenchEnglishLessons from "../../exercises/lessons";
import WeakWords from "../../components/common/WeakWords.component";
import Navbar from "../../navbar/Main.navbar";
import AppContainer from "../../app/AppContainer.styled";
import VerticalFlexbox from "../../components/div/VerticalFlexbox.styled";
import GoBack from "../../components/buttons/GoBack/GoBack.component";
import { LanguageContext } from "../../contexts/language-context";
import H2 from "../../components/texts/H2.styled";
import Card from "../../components/cards/Card.styled";
import H3 from "../../components/texts/H3.styled";

const mapStateToProps = state => ({ user: state.user });

const Topic = props => {
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
  const lessons = lessonsData.map(val => {
    let progressColor;
    const progress = lessonsStats ? lessonsStats[val[0]] : null;
    if (progress >= 0.8) {
      progressColor = "gold";
    } else if (progress >= 0.4) {
      progressColor = "green";
    } else progressColor = "darkBlue";

    return (
      <Card borderColor={progressColor} key={val[0]}>
        <H3 margin="10px 0 0 0">{language.lessons[theme][val[0]]}</H3>
        <ProgressCircle progress={progress} progressColor={progressColor} />
        <ProgressPercentage progress={progress} progressColor={progressColor} />
        <GoldStar progress={progress} />
        <div className="themeButtons">
          <StartTestButton match={match} lesson={val[0]} theme={theme} />
          <LearnWordsButton match={match} lesson={val[0]} />
        </div>
      </Card>
    );
  });

  /* -----------------    rendering component     -----------------  */
  if (lessons || !isAuthenticated) {
    return (
      <AppContainer withNavbar>
        <Navbar />
        <ScrollToTopOnMount />
        <VerticalFlexbox>
          <GoBack to="/curriculum" />
          <H2 margin="30px 0 30px 0">{language.themes[theme]}</H2>
          {isAuthenticated && isWeakWordsModeLaunchable && (
            <WeakWords reference={theme} />
          )}
          <div className="lessonCards">{lessons}</div>
        </VerticalFlexbox>
      </AppContainer>
    );
  }
  return null;
};

Topic.propTypes = {
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
)(Topic);
