import React, { useContext } from "react";
import PropTypes from "prop-types";
import { ThemeContext } from "styled-components";
import { Description, CheckCircleOutline, Grade } from "styled-icons/material";

import CONSTANTS from "../config/constants";
import VerticalFlexbox from "../components/div/VerticalFlexbox.styled";
import P from "../components/texts/P.styled";

const { lessonTypes } = CONSTANTS;

const LessonsStats = props => {
  const theme = useContext(ThemeContext);
  const { lessons, lessonType } = props;
  let LessonIcon;
  let iconColor;
  if (lessonType === lessonTypes.totalNumber) {
    LessonIcon = Description;
    iconColor = theme.colors.darkBlue;
  } else if (lessonType === lessonTypes.greenLessons) {
    LessonIcon = CheckCircleOutline;
    iconColor = theme.colors.green;
  } else {
    LessonIcon = Grade;
    iconColor = theme.colors.gold;
  }

  return (
    <VerticalFlexbox>
      <LessonIcon
        alt="number of lessons in topic"
        size={36}
        color={iconColor}
      />
      <P margin="0">{lessons}</P>
    </VerticalFlexbox>
  );
};

LessonsStats.propTypes = {
  lessons: PropTypes.number.isRequired,
  lessonType: PropTypes.string.isRequired,
};

export default LessonsStats;
