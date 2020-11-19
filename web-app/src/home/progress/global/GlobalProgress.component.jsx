import React from "react";

import ProgressBar from "./ProgressBar.component";

import VerticalFlexbox from "../../../components/div/VerticalFlexbox.styled";
import H1 from "../../../components/texts/H1.styled";
import { LanguageContext } from "../../../contexts/language-context";
import DetailledProgress from "../detailled/DetailledProgress.component";
import DetailledStatsContainer from "../detailled/DetailledStatsContainer.styled";

const mapStateToProps = (state) => ({ user: state.user });

const GlobalProgress = (props) => {
  const { user } = props;
  const { globalPercentage } = user.stats.globalProgress;
  return (
    <LanguageContext.Consumer>
      {({ home }) => (
        <VerticalFlexbox margin="30px 0 0 0">
          <H1 margin="0 0 20px 0">{home.progressTitle}</H1>
          {globalPercentage && <ProgressBar progress={globalPercentage} />}
          <DetailledStatsContainer>
            <DetailledProgress statsToShow="words" />
            <DetailledProgress statsToShow="lessons" />
          </DetailledStatsContainer>
        </VerticalFlexbox>
      )}
    </LanguageContext.Consumer>
  );
};

export default GlobalProgress;
