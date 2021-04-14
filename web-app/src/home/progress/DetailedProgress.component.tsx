import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { Search, CheckCircleOutline, Grade } from "styled-icons/material";

import DetailedProgressHr from "./styled/DetailedProgressHr.styled";

import HorizontalFlexbox from "../../components/div/HorizontalFlexbox.styled";
import VerticalFlexbox from "../../components/div/VerticalFlexbox.styled";
import H2 from "../../components/texts/H2.styled";
import H3 from "../../components/texts/H3.styled";
import { LanguageContext } from "../../contexts/language-context";

type Props = {
  goldStats: number;
  greenStats: number;
  statsToShow: "words" | "lessons";
  studiedStats: number;
};

const iconSize = "36";

const DetailedProgress = (props: Props) => {
  const { greenStats, goldStats, statsToShow, studiedStats } = props;
  const theme = useContext(ThemeContext);
  const {
    colors: { darkBlue, green, gold },
  } = theme;

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
          <DetailedProgressHr />
          <HorizontalFlexbox justifyContent="space-between" width="180px">
            <VerticalFlexbox>
              <Search title="seen" size={iconSize} color={darkBlue} />
              <H3>{studiedStats}</H3>
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

export default DetailedProgress;
