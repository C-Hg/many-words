import React, { useContext } from "react";
import PropTypes from "prop-types";

import Card from "../../../components/cards/Card.styled";
import H3 from "../../../components/texts/H3.styled";
import { LanguageContext } from "../../../contexts/language-context";
import ProgressCircle from "./ProgressCircle.component";
import GoldStar from "../../../components/theme/GoldStar.component";
import StartTestButtonComponent from "../../../components/theme/StartTestButton.component";
import LearnWordsButton from "../../../components/theme/LearnWordsButton.component";
import ProgressPercentage from "./ProgressPercentage.styled";
import HorizontalFlexbox from "../../../components/div/HorizontalFlexbox.styled";

const LessonCard = props => {
  const { color, theme, lesson, match, progress } = props;
  const language = useContext(LanguageContext);
  return (
    <Card borderColor={color} key={lesson} width="140px" height="200px">
      <H3 margin="10px 0 0 0">{language.lessons[theme][lesson]}</H3>
      <ProgressCircle progress={progress} color={color} />
      {progress > 0 && (
        <ProgressPercentage>{Math.floor(progress * 100)}</ProgressPercentage>
      )}
      <GoldStar progress={progress} />
      <HorizontalFlexbox width="70%" justifyContent="space-evenly">
        <StartTestButtonComponent match={match} lesson={lesson} theme={theme} />
        <LearnWordsButton match={match} lesson={lesson} />
      </HorizontalFlexbox>
    </Card>
  );
};

LessonCard.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  progress: PropTypes.number,
  lesson: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

LessonCard.defaultProps = {
  progress: 0,
};

export default LessonCard;
