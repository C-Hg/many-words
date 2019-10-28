import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { LanguageContext } from "../../../contexts/language-context";

function mapStateToProps(state) {
  return { user: state.user };
}

const LessonProgress = props => {
  const { user } = props;
  const {
    studiedLessons,
    greenLessons,
    goldLessons,
  } = user.stats.globalProgress;
  return (
    <LanguageContext.Consumer>
      {({ home }) => (
        <div className="wordStats">
          <h1 className="progressTitle">{home.lessons}</h1>
          <hr className="progressSeparation" />
          <div className="userStats">
            <div className="iconAndStat">
              <i alt="seen" className="material-icons md-48 seenIcon">
                search
              </i>
              <div className="userStat">{studiedLessons}</div>
            </div>
            <div className="iconAndStat">
              <i alt="green" className="material-icons md-48 greenIcon">
                check_circle_outline
              </i>
              <div className="userStat">{greenLessons}</div>
            </div>
            <div className="iconAndStat">
              <i alt="gold" className="material-icons md-48 goldIcon">
                grade
              </i>
              <div className="userStat">{goldLessons}</div>
            </div>
          </div>
        </div>
      )}
    </LanguageContext.Consumer>
  );
};

LessonProgress.propTypes = {
  user: {
    stats: {
      globalProgress: {
        studiedLessons: PropTypes.number,
        greenLessons: PropTypes.number,
        goldLessons: PropTypes.number,
      },
    },
  }.isRequired,
};

LessonProgress.defaultProps = {};

export default connect(
  mapStateToProps,
  null
)(LessonProgress);
