import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { Search, CheckCircleOutline, Grade } from "styled-icons/material";

import DetailledProgressHr from "./DetailledProgressHr.styled";

import HorizontalFlexbox from "../../../components/div/HorizontalFlexbox.styled";
import VerticalFlexbox from "../../../components/div/VerticalFlexbox.styled";
import H2 from "../../../components/texts/H2.styled";
import H3 from "../../../components/texts/H3.styled";
import { LanguageContext } from "../../../contexts/language-context";

const iconSize = "36";

const DetailledProgress = (props) => {
  const { user, statsToShow } = props;
  const {
    encounteredWords,
    greenWords,
    goldWords,
    studiedLessons,
    greenLessons,
    goldLessons,
  } = user.stats.globalProgress;
  const theme = useContext(ThemeContext);
  const {
    colors: { darkBlue, green, gold },
  } = theme;

  const seenStats = statsToShow === "words" ? encounteredWords : studiedLessons;
  const greenStats = statsToShow === "words" ? greenWords : greenLessons;
  const goldStats = statsToShow === "words" ? goldWords : goldLessons;

  return (
    <LanguageContext.Consumer>
      {({ home }) => (
        <VerticalFlexbox
          padding="15px"
          width="200px"
          height="130px"
          border={`3px solid ${darkBlue}`}
          borderRadius="15px"
        >
          <H2 margin="0">{home[statsToShow]}</H2>
          <DetailledProgressHr />
          <HorizontalFlexbox justifyContent="space-between" width="180px">
            <VerticalFlexbox>
              <Search title="seen" size={iconSize} color={darkBlue} />
              <H3>{seenStats}</H3>
            </VerticalFlexbox>
            <VerticalFlexbox>
              <CheckCircleOutline title="green" size={iconSize} color={green} />
              <H3>{greenStats}</H3>
            </VerticalFlexbox>
            <VerticalFlexbox>
              <Grade title="gold" size={iconSize} color={gold} />
              <H3>{goldStats}</H3>
            </VerticalFlexbox>
          </HorizontalFlexbox>
        </VerticalFlexbox>
      )}
    </LanguageContext.Consumer>
  );
};

export default DetailledProgress;
