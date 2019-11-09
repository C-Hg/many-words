import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { LanguageContext } from "../../../contexts/language-context";
import ProgressBar from "./ProgressBar.component";
import WordProgress from "./WordProgress.component";
import LessonProgress from "./LessonProgress.component";

const mapStateToProps = state => ({ user: state.user });

const GlobalProgress = props => {
  const { user } = props;
  const { globalPercentage } = user.stats.globalProgress;
  return (
    <LanguageContext.Consumer>
      {({ home }) => (
        <div className="globalProgress">
          <h1 className="menuTitle globalProgressTitle">
            {home.progress_title}
          </h1>
          {globalPercentage && <ProgressBar progress={globalPercentage} />}
          <div className="wordAndLessonProgress">
            <WordProgress />
            <LessonProgress />
          </div>
        </div>
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
