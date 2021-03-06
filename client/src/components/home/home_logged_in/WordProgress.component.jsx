import React from "react";
import { LanguageContext } from "../../../contexts/language-context";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return { user: state.user };
}

function WordProgress(props) {
  const globalProgress = props.user.stats.globalProgress;
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
              <div className="userStat">
                {globalProgress.encounteredWords || 0}
              </div>
            </div>
            <div className="iconAndStat">
              <i alt="green" className="material-icons md-48 greenIcon">
                check_circle_outline
              </i>
              <div className="userStat">{globalProgress.greenWords || 0}</div>
            </div>
            <div className="iconAndStat">
              <i alt="gold" className="material-icons md-48 goldIcon">
                grade
              </i>
              <div className="userStat">{globalProgress.goldWords || 0}</div>
            </div>
          </div>
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default connect(
  mapStateToProps,
  null
)(WordProgress);
