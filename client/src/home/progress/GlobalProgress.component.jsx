import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { LanguageContext } from "../../contexts/language-context";
import ProgressBar from "./ProgressBar.component";
import WordProgress from "../../components/home/home_logged_in/WordProgress.component";
import LessonProgress from "../../components/home/home_logged_in/LessonProgress.component";
import VerticalFlexbox from "../../components/div/VerticalFlexbox.styled";
import H1 from "../../components/texts/H1.styled";

const mapStateToProps = state => ({ user: state.user });

const GlobalProgress = props => {
  const { user } = props;
  const { globalPercentage } = user.stats.globalProgress;
  return (
    <LanguageContext.Consumer>
      {({ home }) => (
        <VerticalFlexbox>
          <H1 margin="30px 0 20px 0">{home.progress_title}</H1>
          {globalPercentage && <ProgressBar progress={globalPercentage} />}
          <div className="wordAndLessonProgress">
            <WordProgress />
            <LessonProgress />
          </div>
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
