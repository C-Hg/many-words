import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Grade } from "styled-icons/material";

import Card from "../../../components/cards/Card.styled";
import H3 from "../../../components/texts/H3.styled";
import { LanguageContext } from "../../../contexts/language-context";
import ProgressCircle from "./ProgressCircle.component";
import StartTestButton from "./StartTestButton.component";
import LearnWordsButton from "./LearnWordsButton.component";
import HorizontalFlexbox from "../../../components/div/HorizontalFlexbox.styled";
import VerticalFlexbox from "../../../components/div/VerticalFlexbox.styled";
import GoldStar from "./styled/GoldStar.styled";

const LessonCard = props => {
  const { color, theme, lesson, match, progress } = props;
  const language = useContext(LanguageContext);
  return (
    <Card
      borderColor="darkGrey"
      key={lesson}
      width="150px"
      height="220px"
      backgroundColor="sand"
    >
      <VerticalFlexbox height="50px" width="90%">
        <H3 verticalAlign="center" margin="auto">
          {language.lessons[theme][lesson]}
        </H3>
      </VerticalFlexbox>
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
        <StartTestButton match={match} lesson={lesson} theme={theme} />
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
