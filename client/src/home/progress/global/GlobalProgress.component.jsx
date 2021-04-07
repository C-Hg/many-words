import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { LanguageContext } from "../../../contexts/language-context";
import ProgressBar from "./ProgressBar.component";
import VerticalFlexbox from "../../../components/div/VerticalFlexbox.styled";
import H1 from "../../../components/texts/H1.styled";
import DetailedStatsContainer from "../Detailed/DetailedStatsContainer.styled";
import DetailedProgress from "../Detailed/DetailedProgress.component";

const mapStateToProps = state => ({ user: state.user });

const GlobalProgress = props => {
  const { user } = props;
  const { globalPercentage } = user.stats.globalProgress;
  return (
    <LanguageContext.Consumer>
      {({ home }) => (
        <VerticalFlexbox margin="30px 0 0 0">
          <H1 margin="0 0 20px 0">{home.progressTitle}</H1>
          {globalPercentage && <ProgressBar progress={globalPercentage} />}
          <DetailedStatsContainer>
            <DetailedProgress statsToShow="words" />
            <DetailedProgress statsToShow="lessons" />
          </DetailedStatsContainer>
        </VerticalFlexbox>
      )}
    </LanguageContext.Consumer>
  );
};

GlobalProgress.propTypes = {
  user: PropTypes.shape({
    stats: PropTypes.shape({
      globalProgress: PropTypes.shape({
        globalPercentage: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default connect(
  mapStateToProps,
  null
)(GlobalProgress);
