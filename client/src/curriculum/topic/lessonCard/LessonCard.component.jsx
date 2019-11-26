import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Grade } from "styled-icons/material";

import Card from "../../../components/cards/Card.styled";
import H3 from "../../../components/texts/H3.styled";
import { LanguageContext } from "../../../contexts/language-context";
import ProgressCircle from "./ProgressCircle.component";
import StartTestButtonComponent from "./StartTestButton.component";
import LearnWordsButton from "./LearnWordsButton.component";
import HorizontalFlexbox from "../../../components/div/HorizontalFlexbox.styled";
import GoldStar from "./styled/GoldStar.styled";

const LessonCard = props => {
  const { color, theme, lesson, match, progress } = props;
  const language = useContext(LanguageContext);
  return (
    <Card
      borderColor="darkGrey"
      key={lesson}
      width="140px"
      height="200px"
      backgroundColor="sand"
    >
      <H3 margin="10px 0 10px 0">{language.lessons[theme][lesson]}</H3>
      <ProgressCircle progress={progress} color={color} />
      {progress === 1 && (
        <GoldStar>
          <Grade alt="Perfect" size="60" />
        </GoldStar>
      )}
      <HorizontalFlexbox
        width="75%"
        justifyContent="space-evenly"
        height="50px"
        backgroundColor="sand"
      >
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
