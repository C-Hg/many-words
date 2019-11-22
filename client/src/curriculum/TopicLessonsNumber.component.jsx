import React, { useContext } from "react";
import PropTypes from "prop-types";
import { ThemeContext } from "styled-components";
import { Description } from "styled-icons/material";

import VerticalFlexbox from "../components/div/VerticalFlexbox.styled";
import P from "../components/texts/P.styled";

const TopicLessonsNumber = props => {
  const theme = useContext(ThemeContext);
  const { lessons } = props;
  return (
    <VerticalFlexbox>
      <Description
        alt="number of lessons in topic"
        size={36}
        color={theme.colors.darkBlue}
      />
      <P margin="0" fontWeight="600">
        {lessons}
      </P>
    </VerticalFlexbox>
  );
};

TopicLessonsNumber.propTypes = {
  lessons: PropTypes.number.isRequired,
};

export default TopicLessonsNumber;
