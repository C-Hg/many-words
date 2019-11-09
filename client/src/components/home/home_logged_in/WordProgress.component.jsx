import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { LanguageContext } from "../../../contexts/language-context";

const mapStateToProps = state => ({ user: state.user });

const WordProgress = props => {
  const { user } = props;
  const { encounteredWords, greenWords, goldWords } = user.stats.globalProgress;

  return (
    <LanguageContext.Consumer>
      {({ home }) => (
        <div className="wordStats">
          <h1 className="progressTitle">{home.words}</h1>
          <hr className="progressSeparation" />
          <div className="userStats">
            <div className="iconAndStat">
              <i alt="seen" className="material-icons md-48 seenIcon">
                search
              </i>
              <div className="userStat">{encounteredWords}</div>
            </div>
            <div className="iconAndStat">
              <i alt="green" className="material-icons md-48 greenIcon">
                check_circle_outline
              </i>
              <div className="userStat">{greenWords}</div>
            </div>
            <div className="iconAndStat">
              <i alt="gold" className="material-icons md-48 goldIcon">
                grade
              </i>
              <div className="userStat">{goldWords}</div>
            </div>
          </div>
        </div>
      )}
    </LanguageContext.Consumer>
  );
};

WordProgress.propTypes = {
  user: PropTypes.shape({
    stats: PropTypes.shape({
      globalProgress: PropTypes.shape({
        encounteredWords: PropTypes.number.isRequired,
        greenWords: PropTypes.number.isRequired,
        goldWords: PropTypes.number.isRequired,
      }),
    }),
  }).isRequired,
};

export default connect(
  mapStateToProps,
  null
)(WordProgress);
